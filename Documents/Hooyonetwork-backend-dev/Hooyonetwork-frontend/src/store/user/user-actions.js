import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './user-types';
import axios from 'axios';
import moment from 'moment';

export function loginSuccess (username) {
    return {
        type: LOGIN_SUCCESS,
        username
    }
}

export function login (username, password) {
    return async (dispatch) => {
        return axios.post(process.env.REACT_APP_API + '/admin/login', {username, password}, {withCredentials: true})
            .then(() => {
                localStorage.setItem('expiration', moment().add(1, 'days'));
                localStorage.setItem('username', username);
                dispatch(loginSuccess(username));
                return Promise.resolve();
            }).catch(e => {
                return Promise.reject(e);
            })  
    }
}

export function logoutSuccess () {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logout () {
    return async (dispatch) => {
        // return axios.post(process.env.REACT_APP_API + '/admin/logout', {}, {withCredentials: true})
        //     .then(() => {
        //         localStorage.removeItem('expiration');
        //         localStorage.removeItem('username');
        //         dispatch(logoutSuccess());
        //         return Promise.resolve();
        //     }).catch(e => {
        //         return Promise.reject(e);
        //     })
        localStorage.removeItem('expiration');
        localStorage.removeItem('username');
        dispatch(logoutSuccess());
        return Promise.resolve();    
    }
}