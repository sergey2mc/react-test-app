import { combineReducers, Reducer } from 'redux';

import { rootApi } from '../api';

import { todoReducer } from './todo';

const rootReducer: Reducer = combineReducers({
  todo: todoReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

export default rootReducer;
