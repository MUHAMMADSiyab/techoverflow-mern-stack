import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EmailVerified = ({ auth: { isAuthenticated, loading, user } }) =>
  !loading &&
  isAuthenticated &&
  user !== null &&
  !user.emailVerified && (
    <div className="email-verify-alert">
      Your account email is not verified{" "}
      <Link to={`/verify-email`}>Verify your email</Link>
    </div>
  );

EmailVerified.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(EmailVerified);
