import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import Alert from "../../alerts/Alert";

// Actions
import { addAnswer } from "../../../actions/answer";

const AddAnswer = ({ addAnswer, questionId }) => {
  const [formData, setFormData] = useState({
    body: ""
  });

  const { body } = formData;

  const onSubmit = e => {
    e.preventDefault();

    addAnswer(formData, questionId);
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <h5 style={{ marginTop: "120px" }}>Post answer</h5>
        <hr />
        <Alert />
        <form className="add-answer" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <Editor
              apiKey="nw38hznt2nhic1gj21u46vzizr34ry3dfc2t9fsn1e9rfe18"
              cloudChannel="dev"
              name="body"
              init={{
                selector: "textarea", // change this value according to your HTML
                plugins: "codesample",
                toolbar: "codesample, bold, italic"
              }}
              content="Some initial content"
              initialValue={body}
              onChange={e => {
                setFormData({ ...formData, body: e.target.getContent() });
              }}
            />
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-blue" value="Post answer" />
          </div>
        </form>
      </div>
    </div>
  );
};

AddAnswer.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  questionId: PropTypes.string.isRequired
};

export default connect(
  null,
  { addAnswer }
)(AddAnswer);
