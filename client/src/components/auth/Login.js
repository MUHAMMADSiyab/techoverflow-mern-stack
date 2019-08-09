import React, { useState } from "react";
import Alert from "../alerts/Alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
// Actions
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="container mt-5">
      <div className="row justify-content-sm-center">
        <div className="col-sm-5">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Login into your account</h3>
              <div className="styled-underscore sm" />
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-blue btn-block"
                  />
                </div>
              </form>
              <Alert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
