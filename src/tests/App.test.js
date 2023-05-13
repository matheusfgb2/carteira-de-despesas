import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

beforeEach(() => {
  global.fetch = jest.fn(mockFetch);
});

afterEach(() => {
  global.fetch.mockClear();
});

describe('1 - Tela do login', () => {
  it('Verifica se há um input de email, um input de senha e um botão de entrar', () => {
    renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId('email-input');
    const passwordEl = screen.getByTestId('password-input');
    const btnEl = screen.getByRole('button', { name: /entrar/i });

    expect(emailEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
  });

  it('Verifica se é possível fazer login e há o direcionamento para a rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId('email-input');
    const passwordEl = screen.getByTestId('password-input');
    const btnEl = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailEl, 'teste@teste.com');
    userEvent.type(passwordEl, '123456');
    userEvent.click(btnEl);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
  });
});

describe('2 - Tela da carteira', () => {
  it('Verifica se a API da taxa de câmbio é chamada ao carregar a página', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const API_URL = 'https://economia.awesomeapi.com.br/json/all';
    expect(global.fetch).toHaveBeenCalledWith(API_URL);
  });

  it('Verifica se é possível preencher e enviar um formulário de despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const descriptionEl = screen.getByRole('textbox', { name: /descrição:/i });
    const tagEl = screen.getByRole('combobox', { name: /categoria:/i });
    const valueEl = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const methodEl = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const currencyEl = screen.getByRole('combobox', { name: /moeda:/i });

    userEvent.type(descriptionEl, 'Tênis');
    userEvent.selectOptions(tagEl, screen.getByRole('option', { name: /lazer/i }));
    userEvent.clear(valueEl);
    userEvent.type(valueEl, '500');
    userEvent.selectOptions(methodEl, screen.getByRole('option', { name: /cartão de crédito/i }));
    userEvent.selectOptions(currencyEl, screen.getByRole('option', { name: /eur/i }));
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
  });
});
