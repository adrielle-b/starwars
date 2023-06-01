import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planets, headers, filterName, listFilterNum } = useContext(PlanetsContext);

  const filterComparison = (planet) => listFilterNum
    .every(({ column, comparison, number }) => {
      const planetColumn = Number(planet[column]);

      switch (comparison) {
      case 'maior que':
        return planetColumn > Number(number);
      case 'menor que':
        return planetColumn < Number(number);
      case 'igual a':
        return planetColumn === Number(number);
      default:
        return false;
      }
    });

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
        {planets && planets
          .filter(({ name }) => name.toLowerCase().includes(filterName.toLowerCase()))
          .filter(filterComparison)
          .map((planet) => (
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
