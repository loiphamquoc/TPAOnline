import { combineReducers } from "redux";
import userReducers from "./userReducers";
import routers from "./routers";
import claimInquiryReducers from "./claimInquiryReducers";
import claimHistoryReducers from "./claimHistoryReducers";
import hospitalReducers from "./hospitalReducers";
import indicatorReducers from "./indicator";

const reducers = combineReducers({
    userReducers,
    nav: routers,
    claimInquiryReducers,
    claimHistoryReducers,
    hospitalReducers,
    indicator: indicatorReducers
});

export default reducers;