import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Filtro() {
  const { filterName, setFilterName, setListFilterNum } = useContext(PlanetsContext);

  const availableColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const availableComparisons = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const [filterNum, setFilterNum] = useState({
    column: availableColumns[0],
    comparison: 'maior que',
    number: 0,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterNum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickFilter = () => {
    setListFilterNum((prevState) => ([
      ...prevState,
      filterNum,
    ]));
  };

  return (
    <div>
      <label htmlFor="filtroNome">
        Pesquisar:
        <input
          type="text"
          data-testid="name-filter"
          name="filtroName"
          value={ filterName }
          onChange={ (event) => setFilterName(event.target.value) }
          placeholder="Digite o nome"
        />
      </label>

      <select
        name="column"
        id="column"
        data-testid="column-filter"
        value={ filterNum.column }
        onChange={ (event) => handleChange(event) }
      >
        {availableColumns.map((column, index) => (
          <option key={ index } value={ column }>
            {column}
          </option>
        ))}
      </select>

      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        value={ filterNum.comparison }
        onChange={ (event) => handleChange(event) }
      >
        {availableComparisons.map((comparison, index) => (
          <option key={ index } value={ comparison }>
            {comparison}
          </option>
        ))}
      </select>

      <label htmlFor="number">
        <input
          type="number"
          name="number"
          id="number"
          data-testid="value-filter"
          value={ filterNum.number }
          onChange={ (event) => handleChange(event) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
        disabled={ availableColumns.length === 0 }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filtro;
