import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { values: { planets, headers } } = useContext(PlanetsContext);

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
        {planets && planets.map((planet) => (
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
