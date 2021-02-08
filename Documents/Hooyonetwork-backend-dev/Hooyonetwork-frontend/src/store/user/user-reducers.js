import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './user-types';

export const initialUserState = {
    loggedIn: false,
    username: null
}

export function UserReducer (
    state = initialUserState,
    action
) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                username: action.username
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: false,
                username: null
            }
        default:
            return state
    }
}