import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChangePassword from "./ChangePassword";
// Actions
import { deleteAccount } from "../../../actions/profile";

const Settings = ({ deleteAccount, history }) => (
  <Fragment>
    <h6 className="text-muted mt-4 mb-4">Settings</h6>
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
            <div className="row mt-4">
              <div className="col-sm-5">
                <ChangePassword history={history} />
              </div>
            </div>
          </div>
          <div className="tab-pane container fade" id="account">
            <p className="mt-4">Permamantly delete your account</p>
            <button
              className="btn btn-sm btn-danger"
              onClick={e => deleteAccount()}
            >
              Delete Account
            </button>
            <div className="mt-4 alert alert-warning">
              <strong>Notice:</strong> After deleting your account, you'll not
              be able to recover it. Be safe to go for this action. This action
              could not be undone.
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

export default connect(null, { deleteAccount })(Settings);
