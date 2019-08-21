import React, { useState } from "react";
import Alert from "../alerts/Alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
// Actions
import { setAlert } from "../../actions/alert";
import { signup } from "../../actions/auth";

const Signup = ({ signup, auth: { isAuthenticated, user } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password === passwordConfirm) {
      signup(formData);
    } else {
      setAlert("Passwords do not match", "danger");
    }
  };

  if (isAuthenticated && user !== null)
    return <Redirect to={`/users/${user._id}`} />;

  return (
    <div className="container mt-5">
      <div className="row justify-content-sm-center">
        <div className="col-sm-5">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">
                Signup for{" "}
                <span className="text-blue">
                  tech<strong>overflow</strong>
                </span>
              </h3>
              <div className="styled-underscore sm" />
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                  />
                </div>
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
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Password Confirm:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password Confirm"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Create account"
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

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signup }
)(Signup);
