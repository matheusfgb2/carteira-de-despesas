import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  thunkCurrencies,
  saveExpense,
  getTotalOfExpenses } from '../redux/actions/wallet';
import './WalletForm.css';
import fetchExchangeRates from '../helpers/api';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const defaultPayment = paymentMethods[0];
const defaultTag = tags[0];

class WalletForm extends Component {
  state = {
    description: '',
    tag: defaultTag,
    value: 0,
    method: defaultPayment,
    currency: '',
  };

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
    const { currencies } = this.props;
    this.setState({ currency: currencies[0] });
  }

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { saveExpenseToState, expenses, currencies, getTotalExpenses } = this.props;
    const exchangeRates = await fetchExchangeRates();

    const higherExpenseId = (
      expenses.length > 0
        ? expenses.sort(({ id: idA }, { id: idB }) => idA - idB)[expenses.length - 1].id
        : null
    );

    const expense = {
      id: higherExpenseId !== null ? higherExpenseId + 1 : 0,
      ...this.state,
      exchangeRates };

    saveExpenseToState(expense);
    getTotalExpenses();

    this.setState({
      description: '',
      tag: defaultTag,
      value: '',
      method: defaultPayment,
      currency: currencies[0],
    });
  };

  render() {
    const { isLoading, currencies, error } = this.props;
    const { description, value, currency, tag, method } = this.state;

    if (isLoading) return (<h4 className="loading">Loading...</h4>);
    if (error) return (<h4 className="error-message">{`Erro: ${error}`}</h4>);

    return (
      <div className="wallet-form">
        <form className="form-container" onSubmit={ this.handleSubmitForm }>

          <h2 className="form-title">Despesa</h2>

          <hr />

          <label
            htmlFor="description"
          >
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChangeForm }
            />
          </label>

          <label
            htmlFor="tag"
          >
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChangeForm }
            >
              {tags.map((category) => (
                <option key={ Math.random() } value={ category }>{category}</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="value"
          >
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChangeForm }
            />
          </label>

          <label
            htmlFor="method"
          >
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChangeForm }
            >
              {paymentMethods.map((paymentMethod) => (
                <option
                  key={ Math.random() }
                  value={ paymentMethod }
                >
                  {paymentMethod}

                </option>
              ))}
            </select>
          </label>

          <label
            htmlFor="currency"
          >
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeForm }
            >
              {currencies.map((coin) => (
                <option key={ Math.random() } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <button type="submit">Adicionar despesa</button>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  getTotalExpenses: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  saveExpenseToState: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  isLoading: wallet.isFetching,
  error: wallet.errorMessage,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrencies()),
  saveExpenseToState: (expense) => dispatch(saveExpense(expense)),
  getTotalExpenses: () => dispatch(getTotalOfExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
