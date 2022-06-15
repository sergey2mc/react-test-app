import { createAction } from '@reduxjs/toolkit';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/src/createAction';

const ACTION_TYPES = {
  SET_ACTIVE_TODO_ID: '[TODO]: Set Active Todo Id',
};

export const setActiveTodoId: ActionCreatorWithPayload<string | null> = createAction<string | null>(
  ACTION_TYPES.SET_ACTIVE_TODO_ID
);
