import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../actions/constants";

export const setAlert = (msg, type) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
