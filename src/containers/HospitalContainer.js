import { connect } from "react-redux";
import HospitalComponent from "../components/HospitalComponent";
import { HOSPITAL_GET_ADDRESS_DATA, HOSPITAL_ENQUIRY_DATA } from "../actions/actionTypes";

const mapStateToProps = (state) => {
    const { userReducers, hospitalReducers } = state;
    const user = userReducers;
    const hospital = hospitalReducers;
    return {
        user,
        hospital
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToHomePage: () => dispatch({ type: 'push', routeName: 'Home' }),
        onSelectAddressData: (payload) => dispatch({ type: HOSPITAL_GET_ADDRESS_DATA, payload }),
        onEnquiryHospital: (payload) => dispatch({ type: HOSPITAL_ENQUIRY_DATA, payload }),
    }
}

const HospitalContainer = connect(mapStateToProps, mapDispatchToProps)(HospitalComponent);

export default HospitalContainer;