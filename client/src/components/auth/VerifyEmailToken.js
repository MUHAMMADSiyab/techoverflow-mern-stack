import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Components
import Alert from "../alerts/Alert";
// Actions
import { verifyEmailToken } from "../../actions/auth";

const VerifyEmail = ({
  match: { params },
  verifyEmailToken,
  auth: { loading, isAuthenticated, user }
}) => {
  useEffect(() => {
    const emailToken = params.token.slice(6);

    verifyEmailToken(emailToken);
  }, [verifyEmailToken, params.token]);

  return (
    <div className="container mt-5">
      <Alert />

      {!loading && isAuthenticated && user !== null && user.emailVerified && (
        <Redirect to="/questions" />
      )}
    </div>
  );
};

VerifyEmail.propTypes = {
  verifyEmailToken: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { verifyEmailToken }
)(VerifyEmail);
