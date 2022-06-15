import { createReducer } from '@reduxjs/toolkit';

import { setActiveTodoId } from './todo.actions';

interface State {
  activeTodoId: string | null;
}

export const initialState: State = {
  activeTodoId: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveTodoId, (state: State, { payload }) => {
      state.activeTodoId = payload;
    });
});
