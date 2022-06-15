import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Todo } from '../core/models/todo.model';

export const rootApi = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: [
    'Todo',
  ],
  endpoints: () => ({}),
});

export enum HTTP {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
