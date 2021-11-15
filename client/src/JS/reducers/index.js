import { combineReducers } from "redux";

import userReducer from "./userReducer";
import bookReducer from "./bookReducer";
import reviewReducer from "./reviewReducer";
const rootReducer = combineReducers({
  userReducer,
  bookReducer,
  reviewReducer,
});
export default rootReducer;
