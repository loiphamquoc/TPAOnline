import { connect } from "react-redux";
import LoginComponent from "../components/LoginComponent";
import { LOGIN } from "../actions/actionTypes";

const mapStateToProps = (state) => {
    const { userReducers } = state;
    const user = userReducers;
    return {
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginAction: (user) =>  dispatch({ type: LOGIN, payload: user }),
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default LoginContainer;