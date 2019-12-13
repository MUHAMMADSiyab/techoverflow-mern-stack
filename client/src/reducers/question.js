import {
  GET_QUESTIONS,
  QUESTION_ADDED,
  GET_QUESTION,
  QUESTION_ERROR,
  QUESTION_DOWNVOTED,
  QUESTION_UPVOTED,
  ADD_QUESTION_COMMENT,
  UPDATE_QUESTION_COMMENT,
  DELETE_QUESTION_COMMENT
} from "../actions/constants";

const initialState = {
  questions: [],
  question: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: payload,
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
    case QUESTION_UPVOTED:
      return {
        ...state,
        question: payload,
        loading: false
      };
    case QUESTION_DOWNVOTED:
      return {
        ...state,
        question: payload,
        loading: false
      };
    case ADD_QUESTION_COMMENT:
    case UPDATE_QUESTION_COMMENT:
    case DELETE_QUESTION_COMMENT:
      return {
        ...state,
        question: { ...state.question, comments: payload },
        loading: false
      };
    case QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
