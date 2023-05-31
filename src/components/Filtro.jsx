import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Filtro() {
  const { values: { filterName, setFilterName } } = useContext(PlanetsContext);

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
    </div>
  );
}

export default Filtro;
