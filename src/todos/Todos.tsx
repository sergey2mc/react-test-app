import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, UnpackNestedValue, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import pink from '@mui/material/colors/pink';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../api/todo';
import { Todo } from '../core/models';
import { useAppDispatch, useAppSelector } from '../store';
import { getActiveTodoId, setActiveTodoId } from '../store/todo';

import './Todos.css';

export function Todos() {
  const title = 'Todos';
  const { data: todos } = useGetTodosQuery();
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

  const todoList = [
    ...(todos ? todos : []),
    ...((typeof activeTodoId === 'string' && !activeTodoId) ? [{ _id: activeTodoId, text: '' }] : []),
  ];

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
    <section className="Todos-section">
      <div className="container">
        <h1 className="Todos-title">{title}</h1>

        <Box>
          <nav>
            <List>
              {
                todoList.map((todo: Todo) =>
                  <Fragment key={todo._id}>
                    <ListItem className="Todo-list-item" disablePadding>
                      {todo._id === activeTodoId
                        ? <form className="Todo-form" onSubmit={handleSubmit(onSaveTodo)}>
                            <TextField
                              autoFocus
                              label="Todo text"
                              variant="standard"
                              defaultValue={todo.text}
                              {...register("text", { required: true })}
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
                    </ListItem>

                    <Divider />
                  </Fragment>
                )
              }
            </List>
          </nav>
        </Box>

        <Tooltip title="Add Todo">
          <Fab className="Todo-add-button" color="primary" aria-label="add" onClick={() => onAddActiveTodo()}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </section>
  );
}
