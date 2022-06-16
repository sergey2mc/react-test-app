import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch } from '../store';
import { setActiveTodoId } from '../store/todo';

import './Todos.css';
import { TodoList } from './components/Todo-list/Todo-list';

export function Todos() {
  const title = 'PAGES.TODOS';
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const onAddActiveTodo = () => {
    dispatch(
      setActiveTodoId('')
    );
  };

  return (
    <section className="Todos-section">
      <div className="container">
        <h1 className="Todos-title">{t(title)}</h1>

        <Box>
          <TodoList />
        </Box>

        <Tooltip title={t("TOOLTIPS.ADD_TODO")}>
          <Fab className="Todo-add-button" color="primary" aria-label="add" onClick={() => onAddActiveTodo()}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </section>
  );
}
