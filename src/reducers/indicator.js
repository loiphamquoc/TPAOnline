import {
    SET_GLOBAL_INDICATOR_VISIBILITY,
} from '../actions/actionTypes'  

function indicator(state = {}, action) {
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

export default { indicator, app: { showGlobalIndicator: false } }