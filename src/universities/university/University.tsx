import React from 'react';
import { useParams } from 'react-router-dom';

import './University.css';

export function University() {
  const { name } = useParams<{ name: string }>();

  return (
    <section>
      <h1 className="University-title">{name}</h1>
    </section>
  );
}
