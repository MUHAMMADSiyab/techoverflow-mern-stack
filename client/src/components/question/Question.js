import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Prism from "prismjs";
// CSS
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-twilight.css";
import "react-tagsinput/react-tagsinput.css";
// Actions
import { getQuestionById } from "../../actions/question";

const Question = ({
  getQuestionById,
  question: { question, loading },
  match: { params }
}) => {
  useEffect(() => {
    getQuestionById(params.id);
  }, [getQuestionById, params]);

  // Initial Prism
  Prism.highlightAll();

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-sm-9">
          {!loading && question && (
            <Fragment>
              <h3>{question.title}</h3>
              <p>{question.body}</p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(
  mapStateToProps,
  { getQuestionById }
)(Question);
