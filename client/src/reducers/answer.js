import {
  GET_ANSWERS,
  QUESTION_ADDED,
  GET_QUESTION,
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
} from "../actions/constants";

const initialState = {
  answers: [],
  answer: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ANSWERS:
      return {
        ...state,
        answers: payload,
        loading: false
      };
    case GET_ANSWER:
      return {
        ...state,
        answer: payload,
        loading: false
      };
    case GET_QUESTION:
      return {
        ...state,
        question: payload,
        loading: false
      };
    case QUESTION_ADDED:
      return {
        ...state,
        question: payload,
        loading: false
      };
    case ANSWER_UPVOTED:
    case ANSWER_DOWNVOTED:
    case ADD_ANSWER_COMMENT:
    case UPDATE_ANSWER_COMMENT:
    case DELETE_ANSWER_COMMENT:
    case ACCEPT_ANSWER:
      // Update the answers array with the updated answer
      state.answers.splice(payload.index, 1, payload.answer);
      return {
        ...state,
        answers: state.answers,
        loading: false
      };
    case ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, payload],
        loading: false
      };
    case DELETE_ANSWER:
      return {
        ...state,
        answers: state.answers.filter(answer => answer._id !== payload),
        loading: false
      };
    case ANSWER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
