import {
    SET_GLOBAL_INDICATOR_VISIBILITY,
} from '../actions/actionTypes'  

const INITIAL_STATE = {
    showGlobalIndicator: false
};

const indicatorReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GLOBAL_INDICATOR_VISIBILITY:
            return {
                ...state,
                showGlobalIndicator: action.visible
            };
        default:
            return state;
    }
}

export default indicatorReducers;