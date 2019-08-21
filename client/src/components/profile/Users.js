import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import User from "./User";

// Actions
import { getUsers } from "../../actions/profile";
import { searchUsers } from "../../actions/profile";

const Users = ({ getUsers, searchUsers, profile: { users, loading } }) => {
  const [formData, setFormData] = useState({ username: "" });

  const { username } = formData;

  const onChange = e => setFormData({ [e.target.name]: e.target.value });

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Users</h3>
      <div className="row">
        <div className="col-sm-4 mb-4">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search users"
                name="username"
                value={username}
                onChange={e => onChange(e)}
                autoComplete="off"
                onKeyUp={e => searchUsers(username)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
          users.length > 0 &&
          users.map(user => <User user={user} key={user._id} />)
        )}
      </div>
    </div>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUsers, searchUsers }
)(Users);
