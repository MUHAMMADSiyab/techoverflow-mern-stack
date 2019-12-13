import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditComment from "../forms/EditComment";
// Actions
import { deleteComment as deleteQuestionComment } from "../../../actions/question";
import { deleteComment as deleteAnswerComment } from "../../../actions/answer";
import { showForm } from "../../../actions/form";

const Comments = ({
  showForm,
  deleteQuestionComment,
  deleteAnswerComment,
  form,
  comments,
  auth: { loading, isAuthenticated, user },
  key,
  answer
}) => {
  return (
    <div className="row mt-5 comments">
      <div className="col-sm-3" />
      <div className="col-sm-9">
        <h6>Comments</h6>
        <ul className="list-group">
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <li className="list-group-item" key={index}>
                {form !== comment._id && (
                  <Fragment>
                    <span
                      dangerouslySetInnerHTML={{ __html: comment.text }}
                    ></span>
                    <span className="text-muted">
                      <Moment fromNow>{comment.date}</Moment>
                    </span>
                    <Link
                      to={`/users/${comment.user}`}
                      className="btn btn-link"
                    >
                      {comment.name}
                    </Link>
                  </Fragment>
                )}
                {!loading && isAuthenticated && user._id === comment.user && (
                  <Fragment>
                    {form !== comment._id && (
                      <div className="actions">
                        <button
                          title="Edit"
                          className="btn btn-xs btn-link-custom"
                          onClick={() => showForm(comment._id)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn btn-xs btn-link-custom"
                          onClick={() => {
                            !answer
                              ? deleteQuestionComment(comment._id)
                              : deleteAnswerComment(comment._id, key);
                          }}
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    )}

                    {form === comment._id && (
                      <EditComment
                        comment={comment}
                        key={key}
                        answer={answer}
                      />
                    )}
                  </Fragment>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  answer: PropTypes.bool.isRequired,
  showForm: PropTypes.func.isRequired,
  deleteQuestionComment: PropTypes.func.isRequired,
  deleteAnswerComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  form: state.form.form
});

export default connect(mapStateToProps, {
  showForm,
  deleteQuestionComment,
  deleteAnswerComment
})(Comments);
