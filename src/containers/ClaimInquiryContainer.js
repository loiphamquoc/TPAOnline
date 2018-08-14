import { connect } from "react-redux";
import ClaimInquiryComponent from "../components/ClaimInquiryComponent";
import { GET_CERTIFICATE_LIST } from "../actions/actionTypes";

const mapStateToProps = (state) => {
    const { userReducers, claimInquiryReducers } = state;
    const user = userReducers;
    const claimInquiry = claimInquiryReducers;
    return {
        user,
        claimInquiry
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectPolicy: (payload) => dispatch({ type: GET_CERTIFICATE_LIST, payload }),
    }
}

const ClaimInquiryContainer = connect(mapStateToProps, mapDispatchToProps)(ClaimInquiryComponent);

export default ClaimInquiryContainer;