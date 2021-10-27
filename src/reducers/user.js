import { IS_LOGGED_IN, ADD_USER, CURRENT_USER } from "../action/actionType";

const initialState = {
  userList: [
    {
      userName: "demo",
      password: "P@ssword123",
      firstName: "Dummy",
      lastName: "Account",
    },
  ],
  currentUser: {},
  isLoggedIn: false,
};

function user(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.data,
      };
    case ADD_USER:
      return {
        ...state,
        userList: action.data,
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.data,
      };
    default:
      return state;
  }
}

export default user;
