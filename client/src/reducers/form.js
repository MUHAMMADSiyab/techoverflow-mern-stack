import { SHOW_FORM, HIDE_FORM } from "../actions/constants";

const initialState = {
  form: ""
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SHOW_FORM:
      return {
        ...state,
        form: payload
      };
    case HIDE_FORM:
      return {
        ...state,
        form: ""
      };
    default:
      return state;
  }
};
