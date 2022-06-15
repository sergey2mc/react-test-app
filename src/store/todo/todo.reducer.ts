import { createReducer } from '@reduxjs/toolkit';

import { toggleTodoEditMode } from './todo.actions';

interface State {
  editingTodoId: string;
}

export const initialState: State = {
  editingTodoId: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleTodoEditMode, (state: State, { payload }) => {
    state.editingTodoId = payload;
  });
});
