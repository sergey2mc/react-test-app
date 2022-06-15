import { createAction } from '@reduxjs/toolkit';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/src/createAction';

const ACTION_TYPES = {
  TOGGLE_TODO_EDIT_MODE: '[TODO]: Toggle Todo Edit Mode',
};

export const toggleTodoEditMode: ActionCreatorWithPayload<string> = createAction<string>(
  ACTION_TYPES.TOGGLE_TODO_EDIT_MODE
);
