import { combineReducers } from "redux";
import userReducers from "./userReducers";
import routers from "./routers";
import claimInquiryReducers from "./claimInquiryReducers";

const reducers = combineReducers({
    userReducers,
    nav: routers,
    claimInquiryReducers
});

export default reducers;