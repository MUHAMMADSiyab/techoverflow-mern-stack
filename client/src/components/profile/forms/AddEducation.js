import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { addEducation } from "../../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData);
  };

  return (
    <div className="row add-container">
      <div className="col-sm-8">
        <form onSubmit={e => onSubmit(e)} id="add-edu">
          <div className="row mt-2">
            <label
              htmlFor="title"
              className="form-label col-sm-3 text-right mt-2"
            >
              School/College/University:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="school"
                className="form-control"
                placeholder="School"
                value={school}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <label
              htmlFor="company"
              className="form-label col-sm-3 text-right mt-2"
            >
              Degree:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="degree"
                className="form-control"
                placeholder="Degree"
                value={degree}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <label
              htmlFor="location"
              className="form-label col-sm-3 text-right mt-2"
            >
              Field of Study:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="fieldofstudy"
                className="form-control"
                placeholder="Field of Study"
                value={fieldofstudy}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <label
              htmlFor="from"
              className="form-label col-sm-3 text-right mt-2"
            >
              From Date:
            </label>
            <div className="col-sm-8">
              <input
                type="date"
                name="from"
                className="form-control"
                placeholder="From Date"
                value={from}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-3" />
            <div className="col-sm-8">
              <label htmlFor="current" className="form-check-label">
                <input
                  type="checkbox"
                  name="current"
                  placeholder="Current"
                  value={current}
                  onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />{" "}
                Currently studying
              </label>
            </div>
          </div>

          <div className="row mt-2">
            <label htmlFor="to" className="form-label col-sm-3 text-right mt-2">
              To Date:
            </label>
            <div className="col-sm-8">
              <input
                type="date"
                name="to"
                className="form-control"
                placeholder="To Date"
                value={to}
                onChange={e => onChange(e)}
                disabled={toDateDisabled}
              />
            </div>
          </div>

          <div className="row mt-2">
            <label
              htmlFor="description"
              className="form-label col-sm-3 text-right mt-2"
            >
              Description:
            </label>
            <div className="col-sm-8">
              <textarea
                rows="2"
                name="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-sm-3" />
            <div className="col-sm-8">
              <input
                type="submit"
                className="btn btn-sm btn-blue"
                value="Add education"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
