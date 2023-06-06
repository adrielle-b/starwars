import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planets,
    headers,
    filterName,
    listFilterNum,
    setListFilterNum,
    isOrdered,
    planetsOrder } = useContext(PlanetsContext);

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
        return true;
      }
    });

  return (
    <main>
      <div>
        {listFilterNum && listFilterNum.map(({ column, comparison, number }, index) => (
          <div key={ index } data-testid="filter">
            <button
              type="button"
              data-testid={ `filter-${index}` }
              onClick={ () => {
                const cloneList = [...listFilterNum];
                cloneList.splice(index, 1);
                setListFilterNum(cloneList);
              } }
            >
              X
            </button>
            {column}
            {' '}
            {comparison}
            {' '}
            {number}
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {headers && headers.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { isOrdered ? (
            planetsOrder && planetsOrder
              .filter(({ name }) => name.toLowerCase().includes(filterName.toLowerCase()))
              .filter(filterComparison)
              .map((planet) => (
                <tr key={ planet.name }>
                  {(Object.values(planet)).map((info, index) => {
                    if (index === 0) {
                      return (
                        <td key={ index } data-testid="planet-name">{info}</td>
                      );
                    }
                    return (
                      <td key={ index }>{info}</td>
                    );
                  })}
                </tr>
              ))
          ) : (
            planets && planets
              .filter(({ name }) => name.toLowerCase().includes(filterName.toLowerCase()))
              .filter(filterComparison)
              .map((planet) => (
                <tr key={ planet.name }>
                  {(Object.values(planet)).map((info, index) => (
                    <td key={ index }>{info}</td>
                  ))}
                </tr>
              ))
          )}
        </tbody>
      </table>
    </main>

  );
}

export default Table;
