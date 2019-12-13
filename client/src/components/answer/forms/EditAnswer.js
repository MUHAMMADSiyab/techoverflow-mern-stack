import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Alert from "../../alerts/Alert";

// Actions
import { getAnswerById, editAnswer } from "../../../actions/answer";

const EditAnswer = ({
  getAnswerById,
  editAnswer,
  answer: { answer, loading },
  history,
  match: { params }
}) => {
  const [formData, setFormData] = useState({
    body: ""
  });

  useEffect(() => {
    getAnswerById(params.id);
  }, [getAnswerById, params.id]);

  useEffect(() => {
    setFormData({
      body: !loading && answer ? answer.body : ""
    });
  }, [answer, loading]);

  const { body } = formData;

  const onSubmit = e => {
    e.preventDefault();

    editAnswer(formData, params.id, answer.question_id, history);
  };

  return (
    <div className="container-fluid main-container">
      <div className="row mt-4">
        <div className="col-sm-8">
          <h5>Edit answer</h5>
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
                value={body}
                onChange={e => {
                  setFormData({ ...formData, body: e.target.getContent() });
                }}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btn btn-blue"
                value="Update answer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditAnswer.propTypes = {
  getAnswerById: PropTypes.func.isRequired,
  editAnswer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  answer: state.answer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAnswerById, editAnswer }
)(withRouter(EditAnswer));
