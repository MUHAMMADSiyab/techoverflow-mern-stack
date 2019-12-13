import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { verifyEmail } from "../../actions/auth";
// Components
import Alert from "../alerts/Alert";

const VerifyEmail = ({
  verifyEmail,
  auth: { isAuthenticated, loading, user, token }
}) => {
  const [email, setEmail] = useState("");

  const onChange = e => setEmail(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    if (!loading && isAuthenticated && user !== null) {
      verifyEmail(email, token);
    }
  };

  return (
    <div className="container mt-5">
      <Alert />
      <div className="row justify-content-sm-center">
        <div className="col-sm-5">
          <div className="card">
            <div className="card-body">
              <h5>Verify Email</h5>
              <hr />
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => onChange(e)}
                    className="form-control"
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Send verification code"
                    className="btn btn-success btn-sm btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VerifyEmail.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { verifyEmail }
)(VerifyEmail);
