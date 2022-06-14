import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { University } from '../core/models/univercity.model';
import { getUniversities } from '../core/services/universities-service';

import './Universities.css';

export function Universities() {
  const title = 'Universities';
  const country = 'Ukraine';

  const [universities, setUniversities] = useState<University[]>([]);
  const [universitiesGotten, setUniversitiesGotten] = useState<boolean>(false);

  const getUniversitiesList = async () => {
    const res = await getUniversities(country);
    setUniversities(res);
    setUniversitiesGotten(true);
  };

  useEffect(() => {
    if (!universitiesGotten) {
      getUniversitiesList();
    }
  });

  return (
    <>
      <section>
        <h1 className="Dashboard-title">{title}</h1>

        <ul>
          {
            universities.map(university =>
              <li key={university.name}>
                <Link to={university.name}>
                  {university.name}
                </Link>
              </li>
            )
          }
        </ul>
      </section>
    </>
  );
}
