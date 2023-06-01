import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planets, headers, filterName, listFilterNum } = useContext(PlanetsContext);
  const [listPlanets, setListPlanets] = useState(planets);

  useEffect(() => {
    const filteredByName = planets
      .filter((planet) => (planet.name).toLowerCase().includes(filterName.toLowerCase()));

    const filteredByNumber = filteredByName.filter((planet) => (
      listFilterNum.every(({ column, comparison, number }) => {
        const planetIndex = parseFloat(planet[column]);
        switch (comparison) {
        case 'maior que':
          return planetIndex > Number(number);
        case 'menor que':
          return planetIndex < Number(number);
        case 'igual a':
          return planetIndex === Number(number);
        default:
          return false;
        }
      })));
    setListPlanets(filteredByNumber);
  }, [planets, filterName, listFilterNum]);

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
