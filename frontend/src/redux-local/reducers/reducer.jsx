import { combineReducers } from "redux";
import userDataReducer from "./firebaseAuth";

export const rootReducer = combineReducers({
  userDataReducer,
});
