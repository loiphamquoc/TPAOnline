import { HOSPITAL_GET_ADDRESS_DATA, HOSPITAL_ENQUIRY_DATA } from "./actionTypes";

export const getHospitalAddressData = (payload) => {
    return {
        type: HOSPITAL_GET_ADDRESS_DATA,
        payload
    };
}

export const getHospitalListData = (payload) => {
    return {
        type: HOSPITAL_ENQUIRY_DATA,
        payload
    };
}