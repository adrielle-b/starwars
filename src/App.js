import React from 'react';
import './App.css';
import Table from './components/Table';
import Filtro from './components/Filtro';
import './components/filtro.css';

function App() {
  return (
    <div className="main">
      <h1>Star Wars</h1>
      <Filtro />
      <Table />
    </div>

  );
}

export default App;
