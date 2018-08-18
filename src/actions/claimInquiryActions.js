import { CLAIM_INQUIRY_GET_POLICY_LIST, CLAIM_INQUIRY_GET_CERTIFICATE_LIST, CLAIM_INQUIRY_GET_CERTIFICATE_INFO } from "./actionTypes";

export const getPolicyList = (token) => {
    return {
        type: CLAIM_INQUIRY_GET_POLICY_LIST,
        token
    };
}

export const getCertificateList = (payload) => {
    return {
        type: CLAIM_INQUIRY_GET_CERTIFICATE_LIST,
        payload
    };
}

export const getCertificateInfo = (payload) => {
    return {
        type: CLAIM_INQUIRY_GET_CERTIFICATE_INFO,
        payload
    };
}