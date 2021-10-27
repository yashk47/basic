import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

// const initialState = {
//   userData: {
//     userList: [],
//     currentUser: [],
//     isLoggedIn: false,
//   },
//   tasks: {
//     taskApiData: [],
//     taskUpdatedData: [],
//   },
// };

const initialState = {};

const reduxImmutableStateInvariant =
  require("redux-immutable-state-invariant").default;
let enhancer = composeWithDevTools(
  applyMiddleware(thunk, reduxImmutableStateInvariant())
);
const store = createStore(rootReducer, initialState, enhancer);

export default store;
