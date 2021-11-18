import { combineReducers } from "redux";

import userReducer from "./userReducer";
import bookReducer from "./bookReducer";
import reviewReducer from "./reviewReducer";
import ticketReducer from "./ticketReducer";
const rootReducer = combineReducers({
  userReducer,
  bookReducer,
  reviewReducer,
  ticketReducer,
});
export default rootReducer;
