import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import OptionsMenu from "./OptionsMenu";
import EditEducation from "../forms/EditEducation";
// Actions
import { deleteEducation } from "../../../actions/profile";

const Education = ({
  deleteEducation,
  education,
  auth: { loading, isAuthenticated, user },
  profileUser
}) => {
  const [eduForm, toggleEduForm] = useState(false);

  return (
    <li className="list-group-item">
      {education.degree} from <strong>{education.school}</strong>
      <span className="list-footer">
        <Moment format="MMM YYYY">{education.from}</Moment> -{" "}
        {!education.current ? (
          <Moment format="MMM YYYY">{education.to}</Moment>
        ) : (
          <span>(Current)</span>
        )}
      </span>
      {!loading && isAuthenticated && user._id === profileUser && (
        <OptionsMenu
          form={eduForm}
          toggleForm={toggleEduForm}
          deleteFunc={deleteEducation}
          id={education._id}
        />
      )}
      {/* Edit Form  */}
      {eduForm && <EditEducation education={education} />}
    </li>
  );
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.object.isRequired,
  profileUser: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteEducation }
)(Education);
