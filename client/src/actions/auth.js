import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED
} from "./constants";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Create account
export const signup = userData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/users", userData, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({ type: SIGNUP_FAIL });
  }
};

// Login
export const login = userData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/auth", userData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
