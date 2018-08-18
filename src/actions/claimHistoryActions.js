import { CLAIM_HISTORY_GET_POLICY_LIST, CLAIM_HISTORY_GET_CERTIFICATE_LIST, CLAIM_HISTORY_GET_CERTIFICATE_INFO } from "./actionTypes";

export const getClaimHistoryPolicyList = (token) => {
    return {
        type: CLAIM_HISTORY_GET_POLICY_LIST,
        token
    };
}

export const getClaimHistoryCertificateList = (payload) => {
    return {
        type: CLAIM_HISTORY_GET_CERTIFICATE_LIST,
        payload
    };
}

export const getClaimHistoryCertificateInfo = (payload) => {
    return {
        type: CLAIM_HISTORY_GET_CERTIFICATE_INFO,
        payload
    };
}