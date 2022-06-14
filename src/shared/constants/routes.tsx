import { Home } from '../../home/Home';
import { About } from '../../about/About';
import { Universities } from '../../universities/Universities';
import { University } from '../../universities/university/University';

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
    title: 'Universities',
    path: '/universities',
    component: <Universities />,
  },
  {
    title: 'University',
    path: '/universities/:name',
    component: <University />,
    hideInNav: true,
  }
];
