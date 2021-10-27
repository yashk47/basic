import { CONFIG_TASK_DATA } from "../action/actionType";

const initialState = {
  taskList: [],
};

function task(state = initialState, action) {
  switch (action.type) {
    case CONFIG_TASK_DATA:
      return {
        ...state,
        taskList: action.data,
      };
    default:
      return state;
  }
}

export default task;
