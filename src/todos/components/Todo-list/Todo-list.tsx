import React, { Fragment } from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import { useGetTodosQuery } from '../../../api/todo';
import { Todo } from '../../../core/models';
import { useAppSelector } from '../../../store';
import { getActiveTodoId } from '../../../store/todo';

import './Todo-list.css';
import { TodoListItem } from '../Todo-list-item/Todo-list-item';

export function TodoList() {
  const { data: todos } = useGetTodosQuery();
  const activeTodoId = useAppSelector(getActiveTodoId);

  const todoList = [
    ...(todos ? todos : []),
    ...((typeof activeTodoId === 'string' && !activeTodoId) ? [{ _id: activeTodoId, text: '' }] : []),
  ];

  return (
    <nav>
      <List>
        {
          todoList.map((todo: Todo) =>
            <Fragment key={todo._id}>
              <TodoListItem todo={todo} />
              <Divider />
            </Fragment>
          )
        }
      </List>
    </nav>
  );
}
