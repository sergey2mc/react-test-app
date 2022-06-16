import React from 'react';
import { useTranslation } from 'react-i18next';

import './Home.css';

export function Home() {
  const [t] = useTranslation();
  const title = 'PAGES.HOME';

  return (
    <section>
      <h1 className="Home-title">{t(title)}</h1>
    </section>
  );
}
