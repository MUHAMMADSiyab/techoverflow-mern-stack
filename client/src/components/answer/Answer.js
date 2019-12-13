import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import HoverCard from "../question/partials/HoverCard";
import Comments from "../question/partials/Comments";
import AddComment from "../question/forms/AddComment";
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
  upvote,
  downvote,
  acceptAnswer,
  deleteAnswer
} from "../../actions/answer";

const Answer = ({
  upvote,
  downvote,
  acceptAnswer,
  deleteAnswer,
  answer,
  key,
  auth: { loading, isAuthenticated, user }
}) => {
  useEffect(() => {
    // Initialize Prism
    Prism.highlightAll();
  });

  const [hoverCard, toggleHoverCard] = useState("");

  return (
    <div className="row mb-5" id={answer._id}>
      <div className="col-sm-1 text-right text-muted">
        <div className="votes mt-2">
          {/* Upvote */}
          <button title="Upvote" onClick={() => upvote(answer._id, key)}>
            {answer.upvotes.length > 0 ? (
              <span>
                <i className="fas fa-thumbs-up fa-lg voted"></i>
                <br />
                <small>{answer.upvotes.length}</small>
              </span>
            ) : (
              <i className="fas fa-thumbs-up fa-lg"></i>
            )}
          </button>
          <br />
          {/* Downvote */}
          <button title="Downvote" onClick={() => downvote(answer._id, key)}>
            {answer.downvotes.length > 0 ? (
              <span>
                <i className="fas fa-thumbs-down fa-lg voted"></i>
                <br />
                <small>{answer.downvotes.length}</small>
              </span>
            ) : (
              <i className="fas fa-thumbs-down fa-lg"></i>
            )}
          </button>
          <br />
          {/* Accept */}
          <button
            title={
              answer.accepted
                ? "The owner of the question has marked this answer as Accepted"
                : "Mark this answer as Accepted"
            }
            onClick={() => acceptAnswer(answer._id, key)}
          >
            {answer.accepted ? (
              <i className="fas fa-check fa-lg accepted" />
            ) : (
              <i className="fas fa-check fa-lg" />
            )}
          </button>
        </div>
      </div>
      <div className="col-sm-11">
        <p dangerouslySetInnerHTML={{ __html: answer.body }} />
        <div className="row">
          <div className="col-sm-6" />
          <div className="col-sm-6 q-bottom text-muted mt-4">
            <span>
              <Moment fromNow>{answer.date}</Moment> by{" "}
              <Link
                to={`/users/${answer.user}`}
                onMouseOver={e => toggleHoverCard(answer._id)}
                onMouseLeave={e => toggleHoverCard("")}
              >
                {answer.name}
              </Link>
              {hoverCard === answer._id && <HoverCard question={answer} />}
            </span>
            {/* Actions */}
            {!loading && isAuthenticated && user._id === answer.user && (
              <Fragment>
                <Link
                  to={`/edit-answers/${answer._id}`}
                  className="btn btn-link-custom btn-sm"
                  title="Edit"
                >
                  <i className="fas fa-pencil-alt"></i>
                </Link>
                <button
                  className="btn btn-link-custom btn-sm"
                  onClick={() => deleteAnswer(answer._id)}
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
          comments={answer.comments && answer.comments}
          key={key}
          answer={true}
        />
        {!loading && isAuthenticated && (
          <AddComment
            questionId={null}
            answerId={answer._id}
            id={answer._id}
            key={key}
          />
        )}
      </div>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  acceptAnswer: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { upvote, downvote, acceptAnswer, deleteAnswer }
)(Answer);
