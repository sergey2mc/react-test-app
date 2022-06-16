import { Home } from '../../home/Home';
import { About } from '../../about/About';
import { Todos } from '../../todos/Todos';
import { Todo } from '../../todos/todo/Todo';

export const ROUTES = [
  {
    title: 'PAGES.HOME',
    path: '/',
    component: <Home />,
  },
  {
    title: 'PAGES.ABOUT',
    path: '/about',
    component: <About />,
  },
  {
    title: 'PAGES.TODOS',
    path: '/todos',
    component: <Todos />,
  },
  {
    title: 'PAGES.TODO',
    path: '/todos/:_id',
    component: <Todo />,
    hideInNav: true,
  }
];
