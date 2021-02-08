import { ADD_ALERT, REMOVE_ALERT } from './status-types';

export const initialStatusState = {
    alerts: []
}

export function StatusReducer (
    state = initialStatusState,
    action
) {
    switch (action.type) {
        case ADD_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.id)
            }
        default:
            return state
    }
}