import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-heart"></i>
          {"  "}
          <span className="hide-sm">Wishlist</span>
        </Link>
      </li>

      <li>
        <Link to="/home">
          <i className="fas fa-shopping-cart"></i>
          {"  "}
          <span className="hide-sm">Cart</span>
        </Link>
      </li>
      <li>
        <Link onClick={logoutUser} to="/login">
          <i className="fas fa-sign-out-alt"></i>
          {"  "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link onClick={loginUser} to="/login">
          <i className="fas fa-sign-out-alt"></i>
          {"  "}
          <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-shopping-basket"></i> {"  "}Grocery App
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
