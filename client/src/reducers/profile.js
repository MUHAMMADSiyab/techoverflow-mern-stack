import {
  GET_USERS,
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  SEARCH_USERS,
  UPDATE_PROFILE,
  GET_USER
} from "../actions/constants";

const initialState = {
  users: [],
  user: null,
  profile: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
