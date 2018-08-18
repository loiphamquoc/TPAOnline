import { CLAIM_HISTORY_GET_POLICY_LIST_SUCCESS, CLAIM_HISTORY_GET_POLICY_LIST_FAILED, CLAIM_HISTORY_GET_CERTIFICATE_LIST_SUCCESS, CLAIM_HISTORY_GET_CERTIFICATE_LIST_FAILED, CLAIM_HISTORY_GET_CERTIFICATE_INFO_SUCCESS, CLAIM_HISTORY_GET_CERTIFICATE_INFO_FAILED, CLAIM_HISTORY_GET_CLAIM_HISTORY_SUCCESS, CLAIM_HISTORY_GET_CLAIM_HISTORY_FAILED } from "../actions/actionTypes";

const INITIAL_STATE = {
};

const claimHistoryReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLAIM_HISTORY_GET_POLICY_LIST_SUCCESS:
            return { ...state, lsPolicy: action.payload.lsPolicy, certificateInfo: {}, lsCertificate: [] };
        case CLAIM_HISTORY_GET_POLICY_LIST_FAILED:
            return {};
        case CLAIM_HISTORY_GET_CERTIFICATE_LIST_SUCCESS:
            return { ...state, lsCertificate: action.payload.lsCertificate, certificateInfo: {}, lsClaimHistory: [] };
        case CLAIM_HISTORY_GET_CERTIFICATE_LIST_FAILED:
            return {};
        case CLAIM_HISTORY_GET_CERTIFICATE_INFO_SUCCESS:
            return { ...state, certificateInfo: action.payload.certificateInfo };
        case CLAIM_HISTORY_GET_CERTIFICATE_INFO_FAILED:
            return {};
        case CLAIM_HISTORY_GET_CLAIM_HISTORY_SUCCESS:
            return { ...state, lsClaimHistory: action.payload.lsClaimHistory };
        case CLAIM_HISTORY_GET_CLAIM_HISTORY_FAILED:
            return {};
        default:
            return state;
    }
}

export default claimHistoryReducers;