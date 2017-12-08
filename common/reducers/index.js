import { combineReducers } from 'redux';
import xplaytech from './xplaytech';
import chinaSuntv from './chinaSuntv';

const rootReducer = combineReducers({
    xplaytech,
    chinaSuntv
});

export default rootReducer;
