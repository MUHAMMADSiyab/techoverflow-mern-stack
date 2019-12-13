import { SHOW_FORM } from "../actions/constants";

// Show form
export const showForm = id => dispatch => {
  dispatch({
    type: SHOW_FORM,
    payload: id
  });
};
