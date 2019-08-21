import React from "react";
import PropTypes from "prop-types";

const About = ({ profile: { user, bio } }) => (
  <div className="card no-shadow mb-2">
    <div className="card-body">
      <h5>About {user.name}</h5>
      <hr />
      <p className="small">{bio && bio}</p>
    </div>
  </div>
);

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
