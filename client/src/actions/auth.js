import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  EMAIL_VERIFICATION_ERROR,
  EMAIL_VERIFIED
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
  window.location.reload();
};

// Verify email
export const verifyEmail = (email, token) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      "/api/auth/verify_email",
      { email, authToken: token },
      config
    );

    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    dispatch({
      type: EMAIL_VERIFICATION_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });

    dispatch(setAlert(err.response.data.msg, "danger"));

    const errors = err.response.data.errors;

    if (errors) {
      errors.map(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Verify Email Token
export const verifyEmailToken = emailToken => async dispatch => {
  const config = {
    headers: {
      "x-auth-token": localStorage.token,
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      "/api/auth/verify_email_token",
      { emailToken },
      config
    );

    dispatch({
      type: EMAIL_VERIFIED,
      payload: res.data
    });

    dispatch(setAlert("Email has been verified successfully", "success"));
  } catch (err) {
    dispatch({
      type: EMAIL_VERIFICATION_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });

    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

// Change password
export const changePassword = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/users/change_password", formData, config);

    document.getElementId("password-form").style.display = "none";

    history.push("login");

    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.map(err => dispatch(setAlert(err.msg, "danger")));
      }

      // If not logged in
      if (err.response.status === 401) {
        dispatch(setAlert(err.response.data.msg, "danger"));
      }
    }

    dispatch({ type: AUTH_ERROR });
  }
};
