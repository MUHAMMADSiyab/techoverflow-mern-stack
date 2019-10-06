import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import Alert from "../alerts/Alert";
import HoverCard from "../question/partials/HoverCard";
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
import { getQuestionById, upvote, downvote } from "../../actions/question";

const Question = ({
  getQuestionById,
  upvote,
  downvote,
  question: { question, loading },
  match: { params },
  auth
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
        {!loading && question && (
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
                {question.tags.map((tag, index) => (
                  <span className="badge" key={index}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="q-bottom text-muted mt-4 float-right">
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

                {!auth.loading &&
                  auth.isAuthenticated &&
                  auth.user._id === question.user && (
                    <Link
                      to={`/edit-question/${question._id}`}
                      className="btn btn-sm btn-light"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </Link>
                  )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  question: state.question,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getQuestionById, upvote, downvote }
)(Question);
