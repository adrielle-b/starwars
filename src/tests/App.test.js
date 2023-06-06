import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/planetsProvider';
import userEvent from '@testing-library/user-event';
import mockData from './mockData';

describe('App tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('Verifica o input de pesquisa', () => {
    const planetInput = screen.getByRole('textbox');
    expect(planetInput).toBeInTheDocument();
  });

  
  test('Verifica se é possível filtrar por nome', async () => { 
    const planetInput = screen.getByRole('textbox');
    expect(planetInput).toBeInTheDocument();
    await screen.findByText(/Tatooine/i);
    userEvent.type(planetInput, 'Ho');

    const hothPlanet = await screen.findByText(/Hoth/i)
    expect(hothPlanet).toBeInTheDocument();
  });

  test('Verifica se existem os filtros numéricos', () => {
    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = screen.getByTestId('value-filter')
    expect(valueFilter).toBeInTheDocument();
  });

  test('Verifica o funcionamento dos filtros numéricos e se é possível excluir', async () => {
    await screen.findByText(/Tatooine/i);
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByRole('button', {  name: /filtrar/i })

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '10000');
    userEvent.click(buttonFilter);


    const rowsTest1 = screen.getAllByRole('row');
    expect(rowsTest1.length).toBe(8);

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '5000');
    userEvent.click(buttonFilter);

    const rowsTest2 = screen.getAllByRole('row');
    expect(rowsTest2.length).toBe(7);

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '24');
    userEvent.click(buttonFilter);

    const rowsTest3 = screen.getAllByRole('row');
    expect(rowsTest3.length).toBe(4);

    const buttonExcluir = screen.getByTestId('filter-0');
    userEvent.click(buttonExcluir);

  });


  test('Verifica se todos os planetas estão na tela', async () => {
    await screen.findByText(/Tatooine/i);

    const row = screen.getAllByRole('row');
    expect(row.length).toBe(11);
  });

  test('Verifica se existe os filtros de ordenação', () => {
    const columnOrderFilter = screen.getByTestId('column-sort');
    const radioAscendente = screen.getByTestId('column-sort-input-asc');
    const radioDescendente = screen.getByTestId('column-sort-input-desc');
    const buttonOrder = screen.getByRole('button', {  name: /ordenar/i});

    expect(columnOrderFilter).toBeInTheDocument();
    expect(radioAscendente).toBeInTheDocument();
    expect(radioDescendente).toBeInTheDocument();
    expect(buttonOrder).toBeInTheDocument();
  })

  test('Verifica a funcionalidade da ordenação', () => {
    const columnOrderFilter = screen.getByTestId('column-sort');
    const radioDescendente = screen.getByTestId('column-sort-input-desc');
    const radioAscendente = screen.getByTestId('column-sort-input-asc');
    const buttonOrder = screen.getByRole('button', {  name: /ordenar/i});

    userEvent.selectOptions(columnOrderFilter,'rotation_period');
    userEvent.click(radioDescendente);
    userEvent.click(buttonOrder);

    userEvent.selectOptions(columnOrderFilter,'population');
    userEvent.click(radioAscendente);
    userEvent.click(buttonOrder);
  })
});
