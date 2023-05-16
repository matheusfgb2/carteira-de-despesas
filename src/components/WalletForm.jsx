import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkCurrencies, thunkExchangeRates } from '../redux/actions/thunks';
import { saveExpenses, getTotalOfExpenses } from '../redux/actions';
import './WalletForm.css';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const defaultPayment = paymentMethods[0];
const defaultTag = tags[0];

class WalletForm extends Component {
  state = {
    description: '',
    tag: defaultTag,
    value: '',
    method: defaultPayment,
    currency: '',
  };

  async componentDidMount() {
    const { fetchCurrencies } = this.props;

    await fetchCurrencies();
    const { currencies } = this.props;
    this.setState({ currency: currencies[0] });
  }

  componentDidUpdate(prevProps) {
    const { expenseId, isEditMode, expenses } = this.props;

    if (isEditMode && !prevProps.isEditMode) {
      const expenseCopy = { ...expenses[expenseId] };
      delete expenseCopy.exchangeRates;
      delete expenseCopy.id;
      this.setState({ ...expenseCopy });
    }
  }

  resetLocalState = () => {
    const { currencies } = this.props;

    this.setState({
      description: '',
      tag: defaultTag,
      value: '',
      method: defaultPayment,
      currency: currencies[0],
    });
  };

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { isEditMode, saveExpensesToState,
      expenses, getTotalExpenses } = this.props;

    let updatedExpenses = [];

    if (isEditMode) {
      const { expenseId } = this.props;

      updatedExpenses = [...expenses];
      updatedExpenses[expenseId] = {
        ...updatedExpenses[expenseId],
        ...this.state,
      };
    } else {
      const { fetchExchangeRates } = this.props;

      const exchangeRates = await fetchExchangeRates();
      const expense = { id: expenses.length, ...this.state, exchangeRates };
      updatedExpenses = [...expenses, expense];
    }
    saveExpensesToState(updatedExpenses);
    getTotalExpenses();
    this.resetLocalState();
  };

  render() {
    const { isLoading, isEditMode, currencies } = this.props;
    const { description, value, currency, tag, method } = this.state;

    if (isLoading) return (<h4 className="loading">Loading...</h4>);
    return (
      <div className="wallet-form">
        <form className="form-container" onSubmit={ this.handleSubmitForm }>
          <h2 className="form-title">Despesa</h2>
          <hr />
          <label htmlFor="description">
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
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChangeForm }
            >
              {tags.map((category) => (
                <option key={ Math.random() } value={ category }>{category}</option>))}
            </select>
          </label>
          <label htmlFor="value">
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
          <label htmlFor="method">
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
                </option>))}
            </select>
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeForm }
            >
              {currencies.map((coin) => (
                <option key={ Math.random() } value={ coin }>{coin}</option>))}
            </select>
          </label>
          {isEditMode ? (
            <button type="submit" className="form-btn edit">
              Editar despesa
            </button>
          ) : (
            <button type="submit" className="form-btn">
              Adicionar despesa
            </button>)}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    method: PropTypes.string,
    currency: PropTypes.string })).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchExchangeRates: PropTypes.func.isRequired,
  getTotalExpenses: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  saveExpensesToState: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  isLoading: wallet.isFetchingCur,
  expenses: wallet.expenses,
  isEditMode: wallet.editor,
  expenseId: wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrencies()),
  fetchExchangeRates: () => dispatch(thunkExchangeRates()),
  saveExpensesToState: (expense) => dispatch(saveExpenses(expense)),
  getTotalExpenses: () => dispatch(getTotalOfExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
