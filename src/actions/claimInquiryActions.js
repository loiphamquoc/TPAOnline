import { GET_POLICY_LIST, GET_CERTIFICATE_LIST } from "./actionTypes";

export const getPolicyList = (token) => {
    return {
        type: GET_POLICY_LIST,
        token
    };
}

export const getCertificateList = (payload) => {
    return {
        type: GET_CERTIFICATE_LIST,
        payload
    };
}