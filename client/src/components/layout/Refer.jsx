import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { addReferrerId } from "../../actions/auth";

const Refer = ({ addReferrerId }) => {
  let referrer = window.location.href.split("/").reverse()[0];
  addReferrerId(referrer);
  return <Navigate to="/register" />;
};

export default connect(null, { addReferrerId })(Refer);
