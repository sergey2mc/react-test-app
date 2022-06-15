import { RootState } from '../index';

export const getActiveTodoId = (state: RootState) => state.todo.activeTodoId;
