import { CONFIG_TASK_DATA } from "./actionType";

export const configTaskData = (status) => (dispatch) =>
  dispatch({
    type: CONFIG_TASK_DATA,
    data: status,
  });

export const fetchTaskList = (successCallback, failureCallback) => async () => {
  fetch("http://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then(
      (result) => {
        if (typeof successCallback === "function") {
          successCallback(result);
        }
      },
      (error) => {
        if (typeof failureCallback === "function") {
          failureCallback(error);
        }
      }
    );
};
