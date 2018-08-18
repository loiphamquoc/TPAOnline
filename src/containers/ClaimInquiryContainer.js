import { connect } from "react-redux";
import ClaimInquiryComponent from "../components/ClaimInquiryComponent";
import { CLAIM_INQUIRY_GET_CERTIFICATE_LIST, CLAIM_INQUIRY_GET_CERTIFICATE_INFO } from "../actions/actionTypes";

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
        onSelectPolicy: (payload) => dispatch({ type: CLAIM_INQUIRY_GET_CERTIFICATE_LIST, payload }),
        onInquiryCertInfo: (payload) => dispatch({ type: CLAIM_INQUIRY_GET_CERTIFICATE_INFO, payload }),
    }
}

const ClaimInquiryContainer = connect(mapStateToProps, mapDispatchToProps)(ClaimInquiryComponent);

export default ClaimInquiryContainer;