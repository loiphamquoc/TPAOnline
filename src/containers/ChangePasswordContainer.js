import { connect } from "react-redux";
import ChangePasswordComponent from "../components/ChangePasswordComponent";
import { CHANGE_PASSWORD } from "../actions/actionTypes";

const mapStateToProps = (state) => {
    const { userReducers } = state;
    const user = userReducers;
    return {
        user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToHomePage: () => dispatch({ type: 'push', routeName: 'Home' }),
        onChangePassword: (data) => dispatch({ type: CHANGE_PASSWORD , payload: data}),
    }
}

const ChangePasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComponent);

export default ChangePasswordContainer;