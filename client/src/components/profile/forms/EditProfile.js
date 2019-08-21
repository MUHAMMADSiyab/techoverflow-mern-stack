import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Alert from "../../alerts/Alert";
// Actions
import { getProfileById } from "../../../actions/profile";
import { createProfile } from "../../../actions/profile";

const EditProfile = ({
  getProfileById,
  createProfile,
  profile: { profile, loading },
  auth,
  history,
  match: { params }
}) => {
  const [formData, setFormData] = useState({
    company: "",
    status: "",
    location: "",
    bio: "",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    skills: ""
  });

  useEffect(() => {
    getProfileById(params.id);
    setFormData({
      company: profile !== null && profile.company ? profile.company : "",
      status: profile !== null && profile.status ? profile.status : "",
      location: profile !== null && profile.location ? profile.location : "",
      website: profile !== null && profile.website ? profile.website : "",
      skills:
        profile !== null && profile.skills ? profile.skills.toString() : "",
      bio: profile !== null && profile.bio ? profile.bio : "",
      facebook:
        profile !== null && profile.social.facebook
          ? profile.social.facebook
          : "",
      twitter:
        profile !== null && profile.social.twitter
          ? profile.social.twitter
          : "",
      linkedin:
        profile !== null && profile.social.linkedin
          ? profile.social.linkedin
          : ""
    });
  }, [getProfileById, loading, params.id]);

  const {
    company,
    status,
    location,
    bio,
    skills,
    website,
    facebook,
    twitter,
    linkedin
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    console.log(formData);
    createProfile(formData, history, true);
  };

  if (!auth.loading && auth.user._id !== params.id)
    return <Redirect to={`/users/${params.id}`} />;

  return (
    <div className="container mt-4">
      <div className="card no-shadow">
        <div className="card-body">
          <h4>
            <i className="fas fa-pencil-alt" /> Edit profile
          </h4>
          <hr />
          <Alert />
          <form onSubmit={e => onSubmit(e)}>
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  placeholder="Company"
                  value={company}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={e => onChange(e)}
                >
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">
                    Student or Learning
                  </option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-sm-6">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  name="website"
                  className="form-control"
                  placeholder="Website"
                  value={website}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Location"
                  value={location}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-sm-6">
                <label htmlFor="skills">Skills</label>
                <input
                  type="text"
                  name="skills"
                  className="form-control"
                  placeholder="Skills (separated with commas)"
                  value={skills}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="bio">Bio</label>
                <textarea
                  rows="4"
                  name="bio"
                  className="form-control"
                  placeholder="Tell us something about yourself"
                  value={bio}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>

            <button
              className="btn btn-sm btn-light mt-4"
              data-toggle="collapse"
              data-target="#sociallinks"
              onClick={e => e.preventDefault()}
            >
              Add social links
            </button>

            <div className="collapse mt-4" id="sociallinks">
              <div className="row mb-4">
                <div className="col-sm-1 text-right text-muted">
                  <i className="fab fa-facebook fa-2x" />
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="facebook"
                    className="form-control"
                    placeholder="Facebook"
                    value={facebook}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-sm-1 text-right text-muted">
                  <i className="fab fa-twitter fa-2x" />
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="twitter"
                    className="form-control"
                    placeholder="Twitter"
                    value={twitter}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-sm-1 text-right text-muted">
                  <i className="fab fa-linkedin fa-2x" />
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="linkedin"
                    className="form-control"
                    placeholder="Linkedin"
                    value={linkedin}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-3">
                <input
                  type="submit"
                  value="Create Profile"
                  className="btn btn-blue"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById, createProfile }
)(withRouter(EditProfile));
