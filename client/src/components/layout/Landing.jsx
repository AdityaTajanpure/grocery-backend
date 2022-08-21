import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ auth: { user, loading, isAuthenticated } }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geoSuccess) => {},
      (geoFail) => {}
    );
  });

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Grocery App</h1>
          <p className="lead">Hacksprint GUVI</p>
          <div className="buttons">
            {!loading && (
              <>
                {isAuthenticated ? (
                  <Link to="home" className="btn btn-dark">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="register" className="btn btn-dark">
                      Sign Up
                    </Link>
                    <Link to="login" className="btn btn-light">
                      Login
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Landing);
