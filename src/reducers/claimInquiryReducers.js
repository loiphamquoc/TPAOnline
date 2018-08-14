import { GET_POLICY_LIST_SUCCESS, GET_POLICY_LIST_FAILED, GET_CERTIFICATE_LIST_SUCCESS, GET_CERTIFICATE_LIST_FAILED } from "../actions/actionTypes";

const INITIAL_STATE = {
};

const claimInquiryReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_POLICY_LIST_SUCCESS:
            return {...state, lsPolicy: action.payload.lsPolicy };
        case GET_POLICY_LIST_FAILED:
            return {};
        case GET_CERTIFICATE_LIST_SUCCESS:
            return {...state, lsCertificate: action.payload.lsCertificate };
        case GET_CERTIFICATE_LIST_FAILED:
            return {};
        default:
            return state;
    }
}

export default claimInquiryReducers;