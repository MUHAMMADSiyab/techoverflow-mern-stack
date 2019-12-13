import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import Alert from "../alerts/Alert";
import HoverCard from "../question/partials/HoverCard";
import AddComment from "./forms/AddComment";
import Comments from "./partials/Comments";
import Spinner from "../layout/Spinner";
import Answers from "../answer/Answers";
import AddAnswer from "../answer/forms/AddAnswer";
// Prism
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-c";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-matlab";
import "prismjs/components/prism-http";
// CSS
import "prismjs/themes/prism-ghcolors.css";
// Actions
import {
  getQuestionById,
  upvote,
  downvote,
  deleteQuestion
} from "../../actions/question";

const Question = ({
  getQuestionById,
  upvote,
  downvote,
  deleteQuestion,
  question: { question, loading },
  match: { params },
  auth,
  history
}) => {
  useEffect(() => {
    getQuestionById(params.id);
  }, [getQuestionById, params]);

  useEffect(() => {
    // Initialize Prism
    Prism.highlightAll();
  });

  const [hoverCard, toggleHoverCard] = useState("");

  return (
    <div className="container-fluid main-container">
      <Alert />
      <div className="row single-question">
        {!loading && question ? (
          <Fragment>
            <div className="col-sm-1 text-right text-muted">
              <div className="votes mt-2">
                {/* Upvote */}
                <button onClick={e => upvote(question._id)} title="Upvote">
                  {question.upvotes.length > 0 ? (
                    <span>
                      <i className="fas fa-thumbs-up fa-lg voted"></i>
                      <br />
                      <small>{question.upvotes.length}</small>
                    </span>
                  ) : (
                    <i className="fas fa-thumbs-up fa-lg"></i>
                  )}
                </button>
                <br />
                {/* Downvote */}
                <button onClick={e => downvote(question._id)} title="Downvote">
                  {question.downvotes.length > 0 ? (
                    <span>
                      <i className="fas fa-thumbs-down fa-lg voted"></i>
                      <br />
                      <small>{question.downvotes.length}</small>
                    </span>
                  ) : (
                    <i className="fas fa-thumbs-down fa-lg"></i>
                  )}
                </button>
              </div>
            </div>

            <div className="col-sm-8 question">
              <h3>{question.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: question.body }}></p>
              <div className="tags">
                {question.tags &&
                  question.tags.map((tag, index) => (
                    <span className="badge" key={index}>
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="row">
                <div className="col-sm-6" />
                <div className="col-sm-6 q-bottom text-muted mt-4">
                  <span>
                    Asked <Moment fromNow>{question.date}</Moment> by{" "}
                    <Link
                      to={`/users/${question.user}`}
                      onMouseOver={e => toggleHoverCard(question._id)}
                      onMouseLeave={e => toggleHoverCard("")}
                    >
                      {question.name}
                    </Link>
                    {hoverCard === question._id && (
                      <HoverCard question={question} />
                    )}
                  </span>
                  {/* Actions */}
                  {!auth.loading &&
                    auth.isAuthenticated &&
                    auth.user._id === question.user && (
                      <Fragment>
                        <Link
                          to={`/edit-question/${question._id}`}
                          className="btn btn-link-custom btn-sm"
                          title="Edit"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button
                          className="btn btn-link-custom btn-sm"
                          onClick={() => deleteQuestion(question._id, history)}
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </Fragment>
                    )}
                </div>
              </div>
              {/* Comments */}
              <Comments
                comments={question.comments && question.comments}
                answer={false}
              />
              {!auth.loading && auth.isAuthenticated && (
                <AddComment
                  questionId={question._id}
                  answerId={null}
                  id={question._id}
                />
              )}

              {/* Answers */}
              <Answers questionId={question._id} />

              {/* Add answer */}
              {!auth.loading && auth.isAuthenticated ? (
                <AddAnswer questionId={question._id} />
              ) : (
                <Fragment>
                  <Link to="/login">Login</Link> to <em>post an asnwer</em>
                </Fragment>
              )}
            </div>
          </Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  question: state.question,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getQuestionById,
  upvote,
  downvote,
  deleteQuestion
})(withRouter(Question));
