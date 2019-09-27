import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import HoverCard from "./partials/HoverCard";
// Actions
import { getQuestions } from "../../actions/question";

const Questions = ({
  getQuestions,
  question: { questions, loading },
  auth
}) => {
  useEffect(() => {
    getQuestions();
  }, [getQuestions, loading]);

  const [hoverCard, toggleHoverCard] = useState("");

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-sm-8">
          {!auth.loading && auth.isAuthenticated && (
            <Link to="/ask-question" className="btn btn-blue float-right">
              Ask question
            </Link>
          )}
          <h4 className="mt-5 mb-4">Questions</h4>
          {loading ? (
            <Spinner />
          ) : (
            <ul className="list-group">
              {questions &&
                questions.length > 0 &&
                questions.map(question => (
                  <li className="list-group-item question" key={question._id}>
                    <h5>
                      <Link to={`/questions/${question._id}`}>
                        {question.title}
                      </Link>
                    </h5>

                    <div className="tags">
                      {question.tags.map((tag, index) => (
                        <span className="badge" key={index}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="q-bottom text-muted">
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
                      <div className="mt-2 answers-count">
                        <h4>{question.answers}</h4>
                        <span>
                          {question.answers === 0 || question.answers > 1
                            ? " answers"
                            : " answer"}
                        </span>
                      </div>{" "}
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
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  question: state.question,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(Questions);
