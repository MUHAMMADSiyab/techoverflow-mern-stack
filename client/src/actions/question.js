import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_QUESTIONS,
  QUESTION_ERROR,
  QUESTION_ADDED,
  GET_QUESTION,
  UPVOTED,
  DOWNVOTED
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

// Upvote a question
export const upvote = question_id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/question/${question_id}/upvote`,
      {},
      config
    );

    dispatch({
      type: UPVOTED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert("Plase login to upvote", "danger"));
    }
  }
};

// Downvote a question
export const downvote = question_id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/question/${question_id}/downvote`,
      {},
      config
    );

    dispatch({
      type: DOWNVOTED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert("Plase login to downvote", "danger"));
    }
  }
};
