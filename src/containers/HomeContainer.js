import { connect } from "react-redux";
import HomeComponent from "../components/HomeComponent";
import { LOGOUT, GET_USER_PROFILE, CLAIM_INQUIRY_GET_POLICY_LIST, CLAIM_HISTORY_GET_POLICY_LIST, HOSPITAL_GET_ADDRESS_DATA } from "../actions/actionTypes";

const mapStateToProps = (state) => {
    const { userReducers } = state;
    const user = userReducers;
    return {
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutAction: () =>  dispatch({ type: LOGOUT }),
        onGetUserProfile: (token) =>  dispatch({ type: GET_USER_PROFILE, payload: token }),
        goToClaimInquiryPage: (token) => dispatch({ type: CLAIM_INQUIRY_GET_POLICY_LIST, payload: token }),
        goToClaimHistoryPage: (token) => dispatch({ type: CLAIM_HISTORY_GET_POLICY_LIST, payload: token }),
        goToHospitalPage: (data) => dispatch({ type: HOSPITAL_GET_ADDRESS_DATA, payload: data }),
        goToContactPage: () => dispatch({ type: 'push', routeName: 'Contact' }),
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;