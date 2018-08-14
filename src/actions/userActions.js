import { LOGIN, SET_GLOBAL_INDICATOR_VISIBILITY, GET_USER_PROFILE } from "./actionTypes";
import { Alert, AsyncStorage } from 'react-native';

export const loginAction = (user) => {
    return {
        type: LOGIN,
        user
    };
}

export const getUserProfile = (token) => {
    return {
        type: GET_USER_PROFILE,
        token
    };
}

export function setGlobalIndicatorVisibility(visible) {
    return {
        type: SET_GLOBAL_INDICATOR_VISIBILITY,
        visible
    }
}

export function showRequestAlert(title, message, onPress) {
    Alert.alert(title, message, [
        { text: 'OK', onPress }
    ])
}

export function showRequestConfirm(title, message, onPress) {
    Alert.alert(title, message, [
        { text: 'OK', onPress },
        { text: 'Cancel' }
    ])
}

export async function setToken(token) {
    if (token) {
        await AsyncStorage.setItem('token', token);
    }
}

export async function clearToken() {
    await AsyncStorage.removeItem('token');
}