import React, { Fragment } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import Divider from '@mui/material/Divider';

import { useGetTodosQuery, useUpdateTodoOrderMutation } from '../../../api/todo';
import { Todo } from '../../../core/models';
import { useAppSelector } from '../../../store';
import { getActiveTodoId } from '../../../store/todo';
import { TodoListItem } from '../Todo-list-item/Todo-list-item';

import './Todo-list.css';

export function TodoList() {
  const { data: todos } = useGetTodosQuery();
  const activeTodoId = useAppSelector(getActiveTodoId);
  const [updateTodo] = useUpdateTodoOrderMutation();

  const todoList: Todo[] = [
    ...(todos ? todos : []),
    ...((typeof activeTodoId === 'string' && !activeTodoId) ? [{ _id: activeTodoId, text: '' }] : []),
  ];

  const onTodosReordered = ({ draggableId, destination }: DropResult) => {
    updateTodo({
      _id: draggableId,
      order: destination?.index
    });
  };

  return (
    <DragDropContext onDragEnd={onTodosReordered}>
      <Droppable droppableId="todo-list">
        {
          provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {
                todoList.map((todo: Todo, index: number) => (
                  <Fragment key={todo._id}>
                    <TodoListItem todo={todo} index={index} />
                    <Divider />
                  </Fragment>
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  );
}
