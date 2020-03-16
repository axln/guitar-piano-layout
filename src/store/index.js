import { createStore, combineReducers } from 'redux';
import * as reducers from './reducer';

export const store = createStore(combineReducers(reducers));
