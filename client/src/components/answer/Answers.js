import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Answer from "./Answer";
// Actions
import { getAnswers } from "../../actions/answer";

const Answers = ({ getAnswers, questionId, answer: { answers, loading } }) => {
  useEffect(() => {
    getAnswers(questionId);
  }, [getAnswers, questionId]);

  return (
    <div className="row mt-5">
      <div className="col-sm-12">
        {!loading && answers ? (
          <Fragment>
            <h4>
              {answers.length}
              {answers.length === 0 || answers.length > 1
                ? " Answers"
                : " Answer"}
            </h4>
            <hr />
            {answers.length > 0 &&
              answers.map((answer, index) => (
                <Fragment key={index}>
                  <Answer answer={answer} /> <hr />
                </Fragment>
              ))}
          </Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

Answers.propTypes = {
  questionId: PropTypes.string.isRequired,
  getAnswers: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  answer: state.answer
});

export default connect(
  mapStateToProps,
  { getAnswers }
)(Answers);
