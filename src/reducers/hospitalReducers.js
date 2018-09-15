import { HOSPITAL_GET_ADDRESS_DATA_SUCCESS, HOSPITAL_GET_ADDRESS_DATA_FAILED, HOSPITAL_ENQUIRY_DATA_SUCCESS, HOSPITAL_ENQUIRY_DATA_FAILED } from "../actions/actionTypes";

const INITIAL_STATE = {
};

const hospitalReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOSPITAL_GET_ADDRESS_DATA_SUCCESS:
            return { ...state, lsState: action.payload.lsState, lsDistrict: action.payload.lsDistrict, lsWard: action.payload.lsWard, lsHospital: [] };
        case HOSPITAL_GET_ADDRESS_DATA_FAILED:
            return {};
        case HOSPITAL_ENQUIRY_DATA_SUCCESS:
            return { ...state, lsHospital: action.payload.lsHospital };
        case HOSPITAL_ENQUIRY_DATA_FAILED:
            return {};
        default:
            return state;
    }
}

export default hospitalReducers;