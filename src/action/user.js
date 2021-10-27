import { IS_LOGGED_IN, ADD_USER, CURRENT_USER } from "./actionType";

export const loginStatus = (status) => (dispatch) =>
  dispatch({
    type: IS_LOGGED_IN,
    data: status,
  });

export const addNewUser = (status) => (dispatch) =>
  dispatch({
    type: ADD_USER,
    data: status,
  });

export const setCurrentUserData = (status) => (dispatch) =>
  dispatch({
    type: CURRENT_USER,
    data: status,
  });
