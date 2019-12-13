import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import HoverCard from "./partials/HoverCard";
import Alert from "../alerts/Alert";
// Actions
import { searchQuestions } from "../../actions/question";

const SearchQs = ({
  searchQuestions,
  question: { questions, loading },
  auth,
  match: { params }
}) => {
  useEffect(() => {
    searchQuestions(params.keywords);
  }, [searchQuestions, loading, params.keywords]);

  const [hoverCard, toggleHoverCard] = useState("");

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-sm-8">
          <Alert />
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
              {questions && questions.length > 0 ? (
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
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h6 className="text-muted">
                  No questions found matching your search keyword
                </h6>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

SearchQs.propTypes = {
  searchQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  question: state.question,
  auth: state.auth
});

export default connect(mapStateToProps, { searchQuestions })(SearchQs);
