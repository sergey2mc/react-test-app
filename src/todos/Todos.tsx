import React from 'react';
import { Link } from 'react-router-dom';

import { useGetTodosQuery } from '../api/todo';
import { Todo } from '../core/models/todo.model';

import './Todos.css';

export function Todos() {
  const title = 'Todos';
  const { data: todos } = useGetTodosQuery();

  return (
    <>
      <section>
        <h1 className="Todos-title">{title}</h1>

        <ul>
          {
            todos?.map((todo: Todo) =>
              <li key={todo._id}>
                <Link to={todo._id}>
                  {todo.text}
                </Link>
              </li>
            )
          }
        </ul>
      </section>
    </>
  );
}
