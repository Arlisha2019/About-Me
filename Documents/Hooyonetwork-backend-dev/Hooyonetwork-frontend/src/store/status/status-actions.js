import { ADD_ALERT, REMOVE_ALERT } from './status-types';
import uniqid from 'uniqid';

export function addAlert (alert) {
    alert.id = uniqid();
    return {
        type: ADD_ALERT,
        alert
    }
}

export function removeAlert (id) {
    return {
        type: REMOVE_ALERT,
        id
    }
}