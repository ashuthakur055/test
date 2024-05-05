import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import userReducer from "./userReducer";


const reducers = combineReducers({
  status: statusReducer,
  user: userReducer
});

export default reducers;