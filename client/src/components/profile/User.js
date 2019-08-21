import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ user: { _id, name, avatar } }) => {
  return (
    <div className="col-sm-2">
      <div className="card">
        <div className="card-body text-center">
          <Link to={`/users/${_id}`} className="username-link">
            <img src={avatar} alt="" className="user-icon img-responsive" />
            {name}
          </Link>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
