import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  ACCOUNT_DELETED,
  EMAIL_VERIFICATION_ERROR,
  EMAIL_VERIFIED
} from "../actions/constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
  emailVerficationError: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      // Save token in Local Storage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case ACCOUNT_DELETED:
    case LOGOUT:
    case AUTH_ERROR:
      // Remove token from Local Storage
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case EMAIL_VERIFICATION_ERROR:
      return {
        ...state,
        emailVerficationError: payload
      };
    case EMAIL_VERIFIED:
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
};
