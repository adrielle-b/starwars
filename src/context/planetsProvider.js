import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();

      const resultsUpdate = data.results.map((planet) => {
        const { residents, ...rest } = planet;
        return rest;
      });
      const headersTable = Object.keys(resultsUpdate[0]);
      setPlanets(resultsUpdate);
      setHeaders(headersTable);
    };
    fetchData();
  }, []);

  const values = { planets, headers };
  return (
    <PlanetsContext.Provider value={ { values } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
