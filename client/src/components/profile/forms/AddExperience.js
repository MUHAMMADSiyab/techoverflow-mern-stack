import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { addExperience } from "../../../actions/profile";

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData);
  };

  return (
    <div className="row add-container">
      <div className="col-sm-8">
        <form onSubmit={e => onSubmit(e)} id="add-exp">
          <div className="row mt-2">
            <label
              htmlFor="title"
              className="form-label col-sm-3 text-right mt-2"
            >
              Title:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <label
              htmlFor="company"
              className="form-label col-sm-3 text-right mt-2"
            >
              Company:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="company"
                className="form-control"
                placeholder="Company"
                value={company}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <label
              htmlFor="location"
              className="form-label col-sm-3 text-right mt-2"
            >
              Location:
            </label>
            <div className="col-sm-8">
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
                Current job
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
                value="Add experience"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
