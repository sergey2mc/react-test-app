import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../../shared/constants/routes';

import './Header.css';

export function Header() {
  return (
    <header>
      <nav className="Header-nav">
        {
          ROUTES
            .filter(route => !route.hideInNav)
            .map(route =>
              <NavLink
                className="Header-nav-item"
                to={route.path}
                key={route.path}
                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
              >
                {route.title}
              </NavLink>
            )
        }
      </nav>
    </header>
  );
}
