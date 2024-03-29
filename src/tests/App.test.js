import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import { mockData } from './helpers/mockData';

describe('1 - Tela do login', () => {
  it('1.1 - Verifica se há um input de email, um input de senha e um botão de entrar', () => {
    renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId('email-input');
    const passwordEl = screen.getByTestId('password-input');
    const btnEl = screen.getByRole('button', { name: /entrar/i });

    expect(emailEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
  });

  it('1.2 - Verifica se é possível fazer login e há o direcionamento para a rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId('email-input');
    const passwordEl = screen.getByTestId('password-input');
    const btnEl = screen.getByRole('button', { name: /entrar/i });
    act(() => {
      userEvent.type(emailEl, 'teste@teste.com');
      userEvent.type(passwordEl, '123456');
      userEvent.click(btnEl);
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
  });
});

describe('2 - Tela da carteira', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('2.1 - Verifica se a API da taxa de câmbio é chamada ao carregar a página', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const API_URL = 'https://economia.awesomeapi.com.br/json/all';
    expect(global.fetch).toHaveBeenCalledWith(API_URL);
  });

  it('2.2 - Verifica se é possível preencher e enviar um formulário de despesa', async () => {
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
    act(() => {
      userEvent.type(descriptionEl, 'Tênis');
      userEvent.selectOptions(tagEl, screen.getByRole('option', { name: /lazer/i }));
      userEvent.clear(valueEl);
      userEvent.type(valueEl, '500');
      userEvent.selectOptions(methodEl, screen.getByRole('option', { name: /cartão de crédito/i }));
      userEvent.selectOptions(currencyEl, screen.getByRole('option', { name: /eur/i }));
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    });
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const descriptionFilledEl = screen.getByRole('cell', { name: /tênis/i });
    expect(descriptionFilledEl).toBeInTheDocument();
  });

  it('2.3 - Verifica se é possível deletar uma despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const descriptionEl = screen.getByRole('textbox', { name: /descrição:/i });
    const tagEl = screen.getByRole('combobox', { name: /categoria:/i });
    const valueEl = screen.getByRole('spinbutton', { name: /valor:/i });
    const methodEl = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const currencyEl = screen.getByRole('combobox', { name: /moeda:/i });
    act(() => {
      userEvent.type(descriptionEl, 'Tênis');
      userEvent.selectOptions(tagEl, screen.getByRole('option', { name: /lazer/i }));
      userEvent.clear(valueEl);
      userEvent.type(valueEl, '500');
      userEvent.selectOptions(methodEl, screen.getByRole('option', { name: /cartão de crédito/i }));
      userEvent.selectOptions(currencyEl, screen.getByRole('option', { name: /eur/i }));
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const eurExchangeRateEl = screen.getByRole('cell', { name: /5\.35/i });
    expect(eurExchangeRateEl).toBeInTheDocument();
    const deleteBtnEl = screen.getByRole('button', { name: /excluir/i });
    act(() => {
      userEvent.click(deleteBtnEl);
    });
    expect(eurExchangeRateEl).not.toBeInTheDocument();
  });

  it('2.4 - Verifica se é possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const descriptionEl = screen.getByRole('textbox', { name: /descrição:/i });
    const tagEl = screen.getByRole('combobox', { name: /categoria:/i });
    const valueEl = screen.getByRole('spinbutton', { name: /valor:/i });
    const methodEl = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const currencyEl = screen.getByRole('combobox', { name: /moeda:/i });
    act(() => {
      userEvent.type(descriptionEl, 'Tênis');
      userEvent.selectOptions(tagEl, screen.getByRole('option', { name: /lazer/i }));
      userEvent.clear(valueEl);
      userEvent.type(valueEl, '500');
      userEvent.selectOptions(methodEl, screen.getByRole('option', { name: /cartão de crédito/i }));
      userEvent.selectOptions(currencyEl, screen.getByRole('option', { name: /eur/i }));
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const firtConvertedValueEl = screen.getByRole('cell', { name: /2673\.40/i });
    expect(firtConvertedValueEl).toBeInTheDocument();
    const editBtnEl = screen.getByRole('button', { name: 'Editar' });
    act(() => {
      userEvent.click(editBtnEl);
      userEvent.clear(valueEl);
      userEvent.type(valueEl, '300');
    });
    const submitEditBtnEl = screen.getByRole('button', { name: /editar despesa/i });
    act(() => {
      userEvent.click(submitEditBtnEl);
    });
    const secondConvertedValueEl = screen.getByRole('cell', { name: /1604\.04/i });
    expect(secondConvertedValueEl).toBeInTheDocument();
  });

  it('2.5 - Verifica se, numa situação de erro, há uma mensagem de erro na tela', async () => {
    global.fetch.mockImplementation(async () => {
      throw new Error(error.message);
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
