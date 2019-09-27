import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_QUESTIONS,
  QUESTION_ERROR,
  QUESTION_ADDED,
  GET_QUESTION
} from "./constants";

// Get all questions
export const getQuestions = () => async dispatch => {
  try {
    const res = await axios.get("/api/question");

    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get question by ID
export const getQuestionById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/question/${id}`);

    dispatch({
      type: GET_QUESTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Ask question
export const askQuestion = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/question", formData, config);

    dispatch({
      type: QUESTION_ADDED,
      payload: res.data
    });

    // Todo
    // Redirect to the asked answer page
    history.push("/questions");
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Edit question
export const editQuestion = (formData, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.put(`/api/question/${id}`, formData, config);

    // Todo
    // Redirect to the asked question page
    history.push("/questions");
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};
