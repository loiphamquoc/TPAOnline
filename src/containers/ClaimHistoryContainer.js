import { connect } from "react-redux";
import ClaimHistoryComponent from "../components/ClaimHistoryComponent";
import { CLAIM_HISTORY_GET_CERTIFICATE_LIST, CLAIM_HISTORY_GET_CERTIFICATE_INFO } from "../actions/actionTypes";

const mapStateToProps = (state) => {
    const { userReducers, claimHistoryReducers } = state;
    const user = userReducers;
    const claimHistory = claimHistoryReducers;
    return {
        user,
        claimHistory
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToHomePage: () => dispatch({ type: 'push', routeName: 'Home' }),
        onSelectPolicy: (payload) => dispatch({ type: CLAIM_HISTORY_GET_CERTIFICATE_LIST, payload }),
        onInquiryCertInfo: (payload) => dispatch({ type: CLAIM_HISTORY_GET_CERTIFICATE_INFO, payload }),
    }
}

const ClaimHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(ClaimHistoryComponent);

export default ClaimHistoryContainer;