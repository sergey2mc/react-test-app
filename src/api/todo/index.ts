import { Todo } from '../../core/models/todo.model';
import { HTTP, rootApi } from '../index';

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
    }),

    getTodo: builder.query<Todo, string>({
      query: (id: string) => `todos/${id}`,
    }),

    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo: Partial<Todo>) => ({
        url: 'todos',
        method: HTTP.POST,
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),

    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ _id, ...todo }: Partial<Todo>) => ({
        url: `todos/${_id}`,
        method: HTTP.PUT,
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `todos/${id}`,
        method: HTTP.DELETE,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = userApi as any;
