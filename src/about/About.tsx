import React from 'react';
import { useTranslation } from 'react-i18next';

import './About.css';

export function About() {
  const title = 'PAGES.ABOUT';
  const [t] = useTranslation();

  return (
    <section>
      <h1 className="About-title">{t(title)}</h1>
    </section>
  );
}
