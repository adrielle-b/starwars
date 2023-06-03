import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Filtro() {
  const { planets,
    filterName,
    setFilterName,
    listFilterNum,
    setListFilterNum,
    setIsOrdered,
    setPlanetsOrder } = useContext(PlanetsContext);

  const [filterNum, setFilterNum] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const [columnOrder, setColumnOrder] = useState('population');
  const [order, setOrder] = useState('');

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

    setFilterNum({
      column: availableColumns[0],
      comparison: 'maior que',
      number: 0,
    });
  };

  const handleClickOrder = () => {
    setIsOrdered(true);
    const positivo = 1;
    const negativo = -1;

    const newOrder = planets.slice().sort((planet1, planet2) => {
      if (planet1[columnOrder] === 'unknown' && planet2[columnOrder] !== 'unknown') {
        return negativo; // planet1 deve vir antes de planet2
      }
      if (planet1[columnOrder] !== 'unknown' && planet2[columnOrder] === 'unknown') {
        return positivo; // planet1 deve vir depois de planet2
      }
      if (planet1[columnOrder] === 'unknown' && planet2[columnOrder] === 'unknown') {
        return 0; // mantém a ordem original
      }
      if (order === 'ASC') {
        return Number(planet1[columnOrder]) - Number(planet2[columnOrder]);
      }
      return Number(planet2[columnOrder]) - Number(planet1[columnOrder]);
    });
    setPlanetsOrder(newOrder);
  };

  return (
    <div>
      <section>
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
          {availableColumns
            .filter((columnOption) => !listFilterNum
              .find(({ column }) => columnOption === column))
            .map((column, index) => (
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
      </section>
      <section>
        <select
          name="columnOrder"
          id="columnOrder"
          data-testid="column-sort"
          value={ columnOrder }
          onChange={ (event) => setColumnOrder(event.target.value) }
        >
          {availableColumns.map((column, index) => (
            <option key={ index } value={ column }>
              {column}
            </option>
          ))}
        </select>
        <label htmlFor="orderASC">
          Ascendente
          <input
            type="radio"
            name="orderASC"
            id="orderASC"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ (event) => setOrder(event.target.value) }
            checked={ order === 'ASC' }
          />
        </label>
        Descendente
        <label htmlFor="orderDESC">
          <input
            type="radio"
            name="orderDESC"
            id="orderDESC"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ (event) => setOrder(event.target.value) }
            checked={ order === 'DESC' }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleClickOrder }
        >
          Ordenar
        </button>
      </section>

      <button
        type="button"
        disabled={ listFilterNum.length === 0 }
        onClick={ () => setListFilterNum([]) }
        data-testid="button-remove-filters"
      >
        Limpar Filtros
      </button>
    </div>
  );
}

export default Filtro;
