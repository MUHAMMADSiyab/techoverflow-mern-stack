import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import profile from "./profile";
import question from "./question";

export default combineReducers({
  alert,
  auth,
  profile,
  question
});
