import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Filtro() {
  const { filterName, setFilterName, setListFilterNum } = useContext(PlanetsContext);
  const [filterNum, setFilterNum] = useState({
    column: 'population',
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        value={ filterNum.comparison }
        onChange={ (event) => handleChange(event) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
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
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filtro;
