import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { values: { planets, headers, filterName } } = useContext(PlanetsContext);
  const [listPlanets, setListPlanets] = useState(planets);

  useEffect(() => {
    const filtroName = planets
      .filter((planet) => (planet.name).toLowerCase().includes(filterName.toLowerCase()));
    setListPlanets(filtroName);
  }, [planets, filterName]);

  return (
    <table>
      <thead>
        <tr>
          {headers && headers.map((header) => (
            <th key={ header }>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listPlanets && listPlanets.map((planet) => (
          <tr key={ planet.name }>
            {(Object.values(planet)).map((info, index) => (
              <td key={ index }>{info}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
