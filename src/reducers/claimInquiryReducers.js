import { CLAIM_INQUIRY_GET_POLICY_LIST_SUCCESS, CLAIM_INQUIRY_GET_POLICY_LIST_FAILED, CLAIM_INQUIRY_GET_CERTIFICATE_LIST_SUCCESS, CLAIM_INQUIRY_GET_CERTIFICATE_LIST_FAILED, CLAIM_INQUIRY_GET_CERTIFICATE_INFO_SUCCESS, CLAIM_INQUIRY_GET_CERTIFICATE_INFO_FAILED, CLAIM_INQUIRY_GET_CLAIM_BENEFIT_SUCCESS, CLAIM_INQUIRY_GET_CLAIM_BENEFIT_FAILED } from "../actions/actionTypes";

const INITIAL_STATE = {
};

const claimInquiryReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLAIM_INQUIRY_GET_POLICY_LIST_SUCCESS:
            return { ...state, lsPolicy: action.payload.lsPolicy, certificateInfo: {}, lsCertificate: [] };
        case CLAIM_INQUIRY_GET_POLICY_LIST_FAILED:
            return {};
        case CLAIM_INQUIRY_GET_CERTIFICATE_LIST_SUCCESS:
            return { ...state, lsCertificate: action.payload.lsCertificate, certificateInfo: {}, lsBenefit: [] };
        case CLAIM_INQUIRY_GET_CERTIFICATE_LIST_FAILED:
            return {};
        case CLAIM_INQUIRY_GET_CERTIFICATE_INFO_SUCCESS:
            return { ...state, certificateInfo: action.payload.certificateInfo };
        case CLAIM_INQUIRY_GET_CERTIFICATE_INFO_FAILED:
            return {};
        case CLAIM_INQUIRY_GET_CLAIM_BENEFIT_SUCCESS:
            return { ...state, lsBenefit: action.payload.lsBenefit };
        case CLAIM_INQUIRY_GET_CLAIM_BENEFIT_FAILED:
            return {};
        default:
            return state;
    }
}

export default claimInquiryReducers;