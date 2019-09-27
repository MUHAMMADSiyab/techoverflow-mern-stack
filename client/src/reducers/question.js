import {
  GET_QUESTIONS,
  QUESTION_ADDED,
  GET_QUESTION
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
    default:
      return state;
  }
};
