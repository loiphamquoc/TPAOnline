import { combineReducers } from "redux";
import userReducers from "./userReducers";
import routers from "./routers";
import claimInquiryReducers from "./claimInquiryReducers";
import claimHistoryReducers from "./claimHistoryReducers";

const reducers = combineReducers({
    userReducers,
    nav: routers,
    claimInquiryReducers,
    claimHistoryReducers,
});

export default reducers;