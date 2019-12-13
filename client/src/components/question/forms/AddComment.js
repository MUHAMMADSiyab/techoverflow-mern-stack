import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { addComment as addCommentOnQuestion } from "../../../actions/question";
import { addComment as addCommentOnAnswer } from "../../../actions/answer";
import { showForm } from "../../../actions/form";

const AddComment = ({
  addCommentOnQuestion,
  addCommentOnAnswer,
  showForm,
  questionId,
  answerId,
  id,
  form,
  key
}) => {
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    if (questionId !== null) {
      addCommentOnQuestion(text, questionId);
    } else {
      addCommentOnAnswer(text, answerId, key);
    }
  };

  return (
    <div className="row mt-2 add-comment">
      <div className="col-sm-3" />
      <div className="col-sm-9">
        <button
          className="btn btn-link no-underline"
          onClick={() => showForm(id)}
        >
          Add a comment
        </button>
        {form === id && (
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <textarea
                name="text"
                id="text"
                rows="2"
                placeholder="Write comment"
                className="form-control"
                value={text}
                onChange={e => onChange(e)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Add comment"
                className="btn btn-sm btn-blue"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

AddComment.propTypes = {
  id: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  addCommentOnQuestion: PropTypes.func.isRequired,
  addCommentOnAnswer: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  form: state.form.form
});

export default connect(
  mapStateToProps,
  { addCommentOnQuestion, addCommentOnAnswer, showForm }
)(AddComment);
