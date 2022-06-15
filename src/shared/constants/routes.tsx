import { Home } from '../../home/Home';
import { About } from '../../about/About';
import { Todos } from '../../todos/Todos';
import { Todo } from '../../todos/todo/Todo';

export const ROUTES = [
  {
    title: 'Home',
    path: '/',
    component: <Home />,
  },
  {
    title: 'About',
    path: '/about',
    component: <About />,
  },
  {
    title: 'Todos',
    path: '/todos',
    component: <Todos />,
  },
  {
    title: 'Todo',
    path: '/todos/:_id',
    component: <Todo />,
    hideInNav: true,
  }
];
