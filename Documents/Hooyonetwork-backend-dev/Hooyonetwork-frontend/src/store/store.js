import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialStatusState, StatusReducer } from './status/status-reducers';
import { initialUserState, UserReducer } from './user/user-reducers';

export const initialState = {
    status: initialStatusState,
    user: initialUserState
}

const rootReducer = combineReducers({
    status: StatusReducer,
    user: UserReducer
})

export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
)