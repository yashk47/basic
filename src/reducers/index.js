import { combineReducers } from "redux";
import userData from "./user";
import task from "./task";

export default combineReducers({
  userData,
  task,
});
