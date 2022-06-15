import { Draft } from '@reduxjs/toolkit';

import { Todo } from '../../core/models';
import { HTTP, rootApi } from '../index';

export const todoApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return ({
      getTodos: builder.query<Todo[], void>({
        query: () => '/todos',
        providesTags: ['Todos'],
      }),

      getTodo: builder.query<Todo, string>({
        query: (id: string) => `/todos/${id}`,
        providesTags: ['Todo'],
      }),

      createTodo: builder.mutation<Todo, Partial<Todo>>({
        query: (todo: Partial<Todo>) => ({
          url: '/todos',
          method: HTTP.POST,
          body: todo,
        }),
        async onQueryStarted(_, {queryFulfilled, dispatch}) {
          try {
            const { data: createdTodo } = await queryFulfilled;
            dispatch(
              todoApi.util.updateQueryData('getTodos', undefined, (draftTodos: Todo[]) => {
                draftTodos.push(createdTodo);
              }),
            );
          } catch (err) {
            console.log(err);
          }
        },
      }),

      updateTodo: builder.mutation<Todo, Partial<Todo>>({
        query: ({_id, ...todo}: Partial<Todo>) => ({
          url: `/todos/${_id}`,
          method: HTTP.PUT,
          body: todo,
        }),
        async onQueryStarted(_, {queryFulfilled, dispatch}) {
          try {
            const { data: updatedTodo } = await queryFulfilled;
            dispatch(
              todoApi.util.updateQueryData('getTodos', undefined, (draftTodos: Todo[]) => {
                const index = draftTodos.findIndex(todo => todo._id === updatedTodo._id);
                if (index === -1) {
                  return;
                } else {
                  draftTodos[index] = updatedTodo;
                }
              }),
            );
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: ['Todo'],
      }),

      deleteTodo: builder.mutation<void, string>({
        query: (id: string) => ({
          url: `/todos/${id}`,
          method: HTTP.DELETE,
        }),
        async onQueryStarted(id: string, {queryFulfilled, dispatch}) {
          await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData('getTodos', undefined, (draftTodos: Todo[]) => {
              const index = draftTodos.findIndex(todo => todo._id === id);
              draftTodos.splice(index, 1);
            }),
          );
        },
        invalidatesTags: ['Todo'],
      }),
    });
  },
  overrideExisting: true,
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi as any;
