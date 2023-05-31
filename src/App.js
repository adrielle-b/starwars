import React from 'react';
import './App.css';
import Table from './components/Table';
import Filtro from './components/Filtro';

function App() {
  return (
    <div>
      <h1>Star Wars</h1>
      <Filtro />
      <Table />
    </div>

  );
}

export default App;
