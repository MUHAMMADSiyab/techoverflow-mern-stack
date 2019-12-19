import React, { useState } from "react";
import PropTypes from "prop-types";
import store from "../../../store";
import { connect } from "react-redux";

// Actions
import { setAlert } from "../../../actions/alert";
import { changePassword } from "../../../actions/auth";

const ChangePassword = ({ changePassword }) => {
  const [passForm, togglePassForm] = useState(false);

  const [formData, setFormData] = useState({
    cur_pass: "",
    new_pass: "",
    conf_pass: ""
  });

  const { cur_pass, new_pass, conf_pass } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (new_pass !== conf_pass)
      return store.dispatch(setAlert("Passwords do not match", "danger"));

    // Todo action..
    changePassword(formData);
  };

  return (
    <div>
      <button
        className="btn btn-link no-underline"
        onClick={e => togglePassForm(!passForm)}
      >
        <small>Change account password</small>
      </button>
      <hr />
      {passForm && (
        <form onSubmit={e => onSubmit(e)} id="password-form">
          <div className="form-group">
            <label htmlFor="cur_pass">Current Password</label>
            <input
              type="password"
              name="cur_pass"
              placeholder="Enter current password"
              className="form-control form-control-sm"
              value={cur_pass}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new_pass">New Password</label>
            <input
              type="password"
              name="new_pass"
              placeholder="Enter new password"
              className="form-control form-control-sm"
              value={new_pass}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="conf_pass">Confirm Password</label>
            <input
              type="password"
              name="conf_pass"
              placeholder="Confirm new password"
              className="form-control form-control-sm"
              value={conf_pass}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Change Password"
              className="btn btn-blue btn-sm"
            />
          </div>
        </form>
      )}
    </div>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired
};

export default connect(null, { changePassword })(ChangePassword);
