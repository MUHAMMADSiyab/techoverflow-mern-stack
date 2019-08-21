import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import OptionsMenu from "./OptionsMenu";
import EditExperience from "../forms/EditExperience";
// Actions
import { deleteExperience } from "../../../actions/profile";

const Experience = ({
  deleteExperience,
  experience,
  auth: { loading, isAuthenticated, user },
  profileUser
}) => {
  const [expForm, toggleExpForm] = useState(false);

  return (
    <li className="list-group-item">
      {experience.title}
      {experience.company && (
        <span>
          {" "}
          at <strong>{experience.company}</strong>{" "}
          {experience.location && <span>, {experience.location}</span>}
        </span>
      )}
      <span className="list-footer">
        <Moment format="MMM YYYY">{experience.from}</Moment> -{" "}
        {!experience.current ? (
          <Moment format="MMM YYYY">{experience.to}</Moment>
        ) : (
          <span>(Current)</span>
        )}
      </span>
      {!loading && isAuthenticated && user._id === profileUser && (
        <OptionsMenu
          form={expForm}
          toggleForm={toggleExpForm}
          deleteFunc={deleteExperience}
          id={experience._id}
        />
      )}

      {/* Edit Form  */}
      {expForm && <EditExperience experience={experience} />}
    </li>
  );
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.object.isRequired,
  profileUser: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteExperience }
)(Experience);
