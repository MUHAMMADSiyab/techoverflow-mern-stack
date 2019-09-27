import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Intro = ({ profile, auth }) => (
  <div className="col-sm-3">
    <div className="card no-shadow">
      <div className="card-body text-center">
        <img src={profile.user.avatar} alt="" className="w-1 profile-image" />
        <h5 className="mt-2">{profile.user.name}</h5>
        <p className="text-muted">{profile.status}</p>
        <p className="text-muted small">{profile.company && profile.company}</p>
        <small className="text-muted">
          <i className="fas fa-map-marker-alt" />{" "}
          {profile.location && profile.location}
        </small>
        <div className="profile-social">
          {profile.social && (
            <Fragment>
              {profile.social.facebook && (
                <a className="btn" href={profile.social.facebook}>
                  <i className="fab fa-facebook fa-lg" />
                </a>
              )}

              {profile.social.twitter && (
                <a className="btn" href={profile.social.twitter}>
                  <i className="fab fa-twitter fa-lg" />
                </a>
              )}

              {profile.social.linkedin && (
                <a className="btn" href={profile.social.linkedin}>
                  <i className="fab fa-linkedin fa-lg" />
                </a>
              )}
            </Fragment>
          )}
          {profile.website && (
            <a className="btn" href={profile.website}>
              <i className="fas fa-globe fa-lg" />
            </a>
          )}
        </div>

        {!auth.loading &&
          auth.isAuthenticated &&
          auth.user._id === profile.user._id && (
            <div className="mt-2">
              <Link
                to={`/edit-profile/${profile.user._id}`}
                className="btn btn-link small"
              >
                <i className="fas fa-pencil-alt fa-sm" /> Edit profile
              </Link>
            </div>
          )}

        <div className="profile-skills mt-4">
          <h6>Skills</h6>
          <hr />
          {profile.skills &&
            profile.skills.map((skill, index) => (
              <Fragment key={index}>
                <span className="badge badge-secondary">{skill}</span>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  </div>
);

Intro.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Intro);
