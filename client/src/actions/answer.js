import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ANSWERS,
  HIDE_FORM,
  ANSWER_ERROR,
  ANSWER_UPVOTED,
  ANSWER_DOWNVOTED,
  ADD_ANSWER_COMMENT,
  UPDATE_ANSWER_COMMENT,
  DELETE_ANSWER_COMMENT,
  ACCEPT_ANSWER,
  ADD_ANSWER,
  GET_ANSWER,
  DELETE_ANSWER
} from "./constants";

// Get all answers for a specific question
export const getAnswers = questionId => async dispatch => {
  try {
    const res = await axios.get(`/api/question/${questionId}/answers`);

    dispatch({
      type: GET_ANSWERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get answer by ID
export const getAnswerById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/answer/${id}`);

    dispatch({
      type: GET_ANSWER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Upvote an asnwer
export const upvote = (answer_id, index) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/answer/${answer_id}/upvote`, {}, config);

    dispatch({
      type: ANSWER_UPVOTED,
      payload: { answer: res.data, index }
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
  }
};

// Downvote an answer
export const downvote = (answer_id, index) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/answer/${answer_id}/downvote`,
      {},
      config
    );

    dispatch({
      type: ANSWER_DOWNVOTED,
      payload: { answer: res.data, index }
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    if (err.response.status === 401) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
  }
};

// Add a comment
export const addComment = (text, answer_id, index) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `/api/answer/${answer_id}/comment`,
      { text },
      config
    );

    dispatch({
      type: ADD_ANSWER_COMMENT,
      payload: {
        answer: res.data,
        index
      }
    });

    dispatch({ type: HIDE_FORM });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
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
export const updateComment = (text, commentId, index) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/answer/comment/${commentId}`,
      { text },
      config
    );

    dispatch({
      type: UPDATE_ANSWER_COMMENT,
      payload: {
        answer: res.data,
        index
      }
    });

    dispatch({ type: HIDE_FORM });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Delete a comment
export const deleteComment = (commentId, index) => async dispatch => {
  if (window.confirm("Are you sure you really want to delete this comment ?")) {
    try {
      const res = await axios.delete(`/api/answer/comment/${commentId}`);

      dispatch({
        type: DELETE_ANSWER_COMMENT,
        payload: {
          answer: res.data,
          index
        }
      });

      dispatch(setAlert("Comment deleted", "success"));
    } catch (err) {
      dispatch({
        type: ANSWER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Accept an answer
export const acceptAnswer = (answerId, index) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/answer/${answerId}/accept`, {}, config);

    dispatch({
      type: ACCEPT_ANSWER,
      payload: {
        answer: res.data,
        index
      }
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    // If not logged in
    const errMsg = err.response.data.msg;
    if (
      errMsg === "Not authorized" ||
      errMsg === "Auth token is invalid or expired"
    ) {
      dispatch(
        setAlert("Please login to accept/unaccept this answer", "danger")
      );
    } else {
      dispatch(setAlert(errMsg, "danger"));
    }
  }
};

// Add an answer
export const addAnswer = (formData, questionId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/answer/${questionId}`, formData, config);

    dispatch({
      type: ADD_ANSWER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Edit an asnwer
export const editAnswer = (
  formData,
  answer_id,
  question_id,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.put(`/api/answer/${answer_id}`, formData, config);

    dispatch(setAlert("Anwer updated successfully", "success"));

    // Redirect to the asked question page
    history.push(`/questions/${question_id}`);
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Delete an answer
export const deleteAnswer = answer_id => async dispatch => {
  if (window.confirm("Are you sure you really want to delete this answer ?")) {
    try {
      const res = await axios.delete(`/api/answer/${answer_id}`);

      dispatch({
        type: DELETE_ANSWER,
        payload: res.data
      });

      dispatch(setAlert("Answer deleted successfully", "success"));
    } catch (err) {
      dispatch({
        type: ANSWER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
