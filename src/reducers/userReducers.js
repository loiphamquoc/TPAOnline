import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL } from "../actions/actionTypes";

const INITIAL_STATE = {
    info: null,
    token: null,
    loginIndicator: false,
    logoutIndicator: false,
    loginType: null,
};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case GET_USER_PROFILE_SUCCESS:
            return {...state, loginIndicator: false, token: action.payload.token, loginType: action.payload.loginType };
        case LOGIN_FAILED:
        case GET_USER_PROFILE_FAIL:
            return {};
        case LOGOUT:
            return state;
        default:
            return state;
    }
}

export default userReducers;