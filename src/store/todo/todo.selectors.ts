import { RootState } from '../index';

export const getEditingTodoId = (state: RootState) => state.todo.editingTodoId;
