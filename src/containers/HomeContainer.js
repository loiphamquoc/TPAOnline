import { connect } from "react-redux";
import HomeComponent from "../components/HomeComponent";
import { LOGOUT, GET_USER_PROFILE } from "../actions/actionTypes";

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
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;