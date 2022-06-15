import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetTodoQuery } from '../../api/todo';

import './Todo.css';

export function Todo() {
  const { _id } = useParams<{ _id: string }>();
  const { data: todo } = useGetTodoQuery(_id);

  return (
    <section>
      <h1 className="Todo-title">{todo?.text}</h1>
    </section>
  );
}
