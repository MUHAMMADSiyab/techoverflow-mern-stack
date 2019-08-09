import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  auth: { isAuthenticated, loading },
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !loading && !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
