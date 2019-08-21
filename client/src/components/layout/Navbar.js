import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const GuestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </Fragment>
  );

  const UserLinks = () =>
    user !== null && (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to={`/users/${user._id}`}>
            {user !== null && (
              <img src={user.avatar} alt="" className="profile-icon" />
            )}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/users/${user._id}`}>
            {user !== null && <span>{user.name}</span>}
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#!"
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </a>
        </li>
      </Fragment>
    );

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <Link className="navbar-brand" to="/">
        {"{"} tech<strong>overflow</strong> {"}"}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Questions
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAuthenticated && !loading ? <UserLinks /> : <GuestLinks />}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
