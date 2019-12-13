import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_QUESTIONS,
  QUESTION_ERROR,
  QUESTION_ADDED,
  GET_QUESTION,
  HIDE_FORM,
  QUESTION_UPVOTED,
  QUESTION_DOWNVOTED,
  DELETE_QUESTION_COMMENT,
  UPDATE_QUESTION_COMMENT,
  ADD_QUESTION_COMMENT
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

// Seardh questions
export const searchQuestions = keywords => async dispatch => {
  try {
    const res = await axios.get(`/api/question/search/${keywords}`);

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
      type: QUESTION_UPVOTED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert(err.response.data.msg, "danger"));
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
      type: QUESTION_DOWNVOTED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
  }
};

// Add a comment
export const addComment = (text, question_id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `/api/question/${question_id}/comment`,
      { text },
      config
    );

    dispatch({
      type: ADD_QUESTION_COMMENT,
      payload: res.data
    });

    dispatch({ type: HIDE_FORM });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert("Plase login to comment", "danger"));
    }

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Update comment
export const updateComment = (text, commentId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/question/comment/${commentId}`,
      { text },
      config
    );

    dispatch({
      type: UPDATE_QUESTION_COMMENT,
      payload: res.data
    });

    dispatch({ type: HIDE_FORM });
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

// Delete a comment
export const deleteComment = commentId => async dispatch => {
  if (window.confirm("Are you sure you really want to delete this comment ?")) {
    try {
      const res = await axios.delete(`/api/question/comment/${commentId}`);

      dispatch({
        type: DELETE_QUESTION_COMMENT,
        payload: res.data
      });

      dispatch(setAlert("Comment deleted", "success"));
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Delete a question
export const deleteQuestion = (question_id, history) => async dispatch => {
  if (
    window.confirm("Are you sure you really want to delete this question ?")
  ) {
    try {
      const res = await axios.delete(`/api/question/${question_id}`);

      dispatch(setAlert(res.data, "success"));

      // Redirect
      history.push("/questions");
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
