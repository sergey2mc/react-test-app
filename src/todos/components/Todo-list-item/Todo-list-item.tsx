import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, UnpackNestedValue, useForm } from 'react-hook-form';
import { Draggable } from 'react-beautiful-dnd';

import pink from '@mui/material/colors/pink';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '../../../api/todo';
import { Todo } from '../../../core/models';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getActiveTodoId, setActiveTodoId } from '../../../store/todo';

import './Todo-list-item.css';

export function TodoListItem({ todo, index }: { todo: Todo; index: number }) {
  const dispatch = useAppDispatch();
  const activeTodoId = useAppSelector(getActiveTodoId);
  const [createTodo, { isSuccess: createSuccess }] = useCreateTodoMutation();
  const [updateTodo, { isSuccess: updateSuccess }] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      dispatch(
        setActiveTodoId(null)
      );
    }
  }, [createSuccess, updateSuccess]);

  const onAddActiveTodo = (id?: string) => {
    dispatch(
      setActiveTodoId(id || '')
    );
  };

  const onSaveTodo = ({ text }: UnpackNestedValue<FieldValues>) => {
    if (activeTodoId) {
      updateTodo({ _id: activeTodoId, text });
    } else {
      createTodo({ text });
    }
  };

  const onDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  return (
    <Draggable key={todo._id} draggableId={todo._id} index={index}>
      {
        provided => (
          <div
            className="Todo-list-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {
              todo._id === activeTodoId
                ? <form className="Todo-form" onSubmit={handleSubmit(onSaveTodo)}>
                  <TextField
                    autoFocus
                    variant="standard"
                    defaultValue={todo.text}
                    {...register("text", {required: true})}
                  />

                  <div className="Todo-actions">
                    <IconButton aria-label="save" type="submit">
                      <CheckIcon color="success" />
                    </IconButton>
                  </div>
                </form>
                : <>
                  <Link className="Todo-link" to={todo._id}>
                    <ListItemButton className="Todo-link-button">
                      <ListItemText primary={todo.text} />
                    </ListItemButton>
                  </Link>

                  <div className="Todo-actions">
                    <IconButton aria-label="edit" onClick={() => onAddActiveTodo(todo._id)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDeleteTodo(todo._id)}>
                      <DeleteIcon sx={{ color: pink[500] }} />
                    </IconButton>
                  </div>
                </>
            }
          </div>
        )
      }
    </Draggable>
  );
}
