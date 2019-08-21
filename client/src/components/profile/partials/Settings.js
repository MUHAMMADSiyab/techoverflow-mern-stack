import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { deleteAccount } from "../../../actions/profile";

const Settings = ({ deleteAccount }) => (
  <Fragment>
    <h4 className="mt-4">Settings</h4>
    <div className="card no-shadow mt-2 mb-5">
      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#pi">
              Personal Information
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#account">
              Account
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active" id="pi">
            Personal Info
          </div>
          <div className="tab-pane container fade" id="account">
            <p className="mt-2">Permamantly delete your account</p>
            <button
              className="btn btn-sm btn-danger"
              onClick={e => deleteAccount()}
            >
              Delete Account
            </button>
            <div className="mt-4 alert alert-warning">
              <strong>Notice:</strong> After deleting your account, you'll not
              be able to recover it. Be safe to go for this action. This action
              could not be done.
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

Settings.propTypes = {
  deleteAccount: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteAccount }
)(Settings);
