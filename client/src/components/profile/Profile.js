import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Experience from "./partials/Experience";
import Education from "./partials/Education";
import Intro from "./partials/Intro";
import Alert from "../alerts/Alert";
import About from "./partials/About";
import AddExperience from "./forms/AddExperience";
import AddEducation from "./forms/AddEducation";
import Settings from "./partials/Settings";
// Actions
import { getProfileById } from "../../actions/profile";
import { getUserById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  getUserById,
  match: { params },
  profile: { profile, loading, user },
  auth,
  history
}) => {
  useEffect(() => {
    getProfileById(params.id);
    getUserById(params.id);
  }, [getProfileById, getUserById, params.id]);

  const [expForm, toggleExpForm] = useState(false);
  const [eduForm, toggleEduForm] = useState(false);

  return (
    <div className="container mt-5">
      <div className="row">
        {auth.loading || loading ? (
          <Spinner />
        ) : !loading && !auth.loading && profile === null ? (
          <div className="col-sm-8">
            {user !== null ? (
              <Fragment>
                <div className="row">
                  <div className="col-sm-3">
                    <img src={user.avatar} alt="" className="w-1 img-rounded" />
                  </div>
                  <div className="col-sm-9">
                    <h3>{user.name}</h3>
                  </div>
                </div>
                {!auth.loading &&
                  auth.isAuthenticated &&
                  user._id === auth.user._id && (
                    <Fragment>
                      <p className="mt-4">You haven't setup your profile yet</p>
                      <Link
                        className="btn btn-sm btn-blue"
                        to="/create-profile"
                      >
                        Create profile
                      </Link>
                    </Fragment>
                  )}
              </Fragment>
            ) : (
              <Fragment>
                <h3 className="text-danger mt-5">
                  This user doesn't exist or may have been deleted
                </h3>{" "}
                <p className="text-muted">404 NOT_FOUND</p>
              </Fragment>
            )}
          </div>
        ) : (
          <Fragment>
            <div className="col-sm-12">
              <Alert />
            </div>
            <Intro profile={profile} />
            <div className="col-sm-9">
              <About profile={profile} />
              <div className="card no-shadow mb-2">
                <div className="card-body">
                  <h6>Professional Experience</h6>
                  <ul className="list-group">
                    {profile.experience.length > 0 &&
                      profile.experience.map(experience => (
                        <Experience
                          experience={experience}
                          key={experience._id}
                          profileUser={profile.user._id}
                        />
                      ))}
                    {auth.isAuthenticated &&
                      !auth.loading &&
                      auth.user._id === profile.user._id && (
                        <Fragment>
                          <button
                            className="btn btn-link small text-left"
                            onClick={e => toggleExpForm(!expForm)}
                          >
                            Add experience
                          </button>
                          {expForm && <AddExperience />}
                        </Fragment>
                      )}
                  </ul>
                </div>
              </div>

              <div className="card no-shadow mb-2">
                <div className="card-body">
                  <h6>Education</h6>
                  <ul className="list-group">
                    {profile.education.length > 0 &&
                      profile.education.map(education => (
                        <Education
                          education={education}
                          key={education._id}
                          profileUser={profile.user._id}
                        />
                      ))}
                    {!auth.loading &&
                      auth.isAuthenticated &&
                      auth.user._id === profile.user._id && (
                        <Fragment>
                          <button
                            className="btn btn-link small text-left"
                            onClick={e => toggleEduForm(!eduForm)}
                          >
                            Add education
                          </button>
                          {eduForm && <AddEducation />}
                        </Fragment>
                      )}
                  </ul>
                </div>
              </div>

              {!auth.loading &&
                auth.isAuthenticated &&
                auth.user._id === user._id && <Settings history={history} />}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, getUserById })(
  Profile
);
