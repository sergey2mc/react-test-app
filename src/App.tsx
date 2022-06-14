import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Header } from './core/components/header/Header';
import { ROUTES } from './shared/constants/routes';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          {
            ROUTES.map(route =>
              <Route
                path={route.path}
                key={route.path}
                element={route.component}
              />
            )
          }
        </Routes>
      </main>
    </div>
  );
}

export default App;
