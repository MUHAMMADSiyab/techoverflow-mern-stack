import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { updateComment as updateQuestionComment } from "../../../actions/question";
import { updateComment as updateAnswerComment } from "../../../actions/answer";

const EditComment = ({
  updateQuestionComment,
  updateAnswerComment,
  comment,
  key,
  answer
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(comment.text);
  }, [comment]);

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    if (!answer) {
      updateQuestionComment(text, comment._id);
    } else {
      updateAnswerComment(text, comment._id, key);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-sm-12 update-comment">
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
              value="Update comment"
              className="btn btn-sm btn-blue"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  answer: PropTypes.bool.isRequired,
  updateQuestionComment: PropTypes.func.isRequired,
  updateAnswerComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateQuestionComment, updateAnswerComment }
)(EditComment);
