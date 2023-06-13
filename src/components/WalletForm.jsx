import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { saveEditedExpense } from '../redux/actions';
import { thunkCurrenciesAndAddExpense } from '../redux/actions/thunks';
import { currenciesPropTypes, expensesPropTypes, userPropTypes } from '../types';
import './WalletForm.css';

const TIMEOUT_MOUNT_VALUE = 1;

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const defaultPayment = paymentMethods[0];
const defaultCategory = categories[0];
const idLength = 6;

const defaultState = {
  description: '',
  category: defaultCategory,
  value: '',
  payment: defaultPayment,
  currency: '',
  isFormIncomplete: true,
};

class WalletForm extends Component {
  state = { id: nanoid(idLength), ...defaultState };

  componentDidMount() {
    setTimeout(async () => {
      const { fetchWalletCurrencies, user } = this.props;
      await fetchWalletCurrencies(user.currency);
      this.setState({ currency: user.currency });
    }, TIMEOUT_MOUNT_VALUE);
  }

  componentDidUpdate(prevProps) {
    const { expenseId, isEditMode, expenses } = this.props;
    if (isEditMode && !prevProps.isEditMode) {
      const expenseCopy = { ...expenses.find(({ id }) => id === expenseId) };
      const { id, description, category, value, payment, currency } = expenseCopy;
      this.setState({ id, description, category, value, payment, currency });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  };

  handleValidation = () => {
    const { value } = this.state;
    this.setState({ isFormIncomplete: value <= 0 });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEditMode } = this.props;
    const { id, description, category, value, payment, currency } = this.state;
    const expenseData = { id, description, category, value, payment, currency };

    if (isEditMode) {
      const { saveUpdatedExpense } = this.props;
      saveUpdatedExpense(expenseData);
    } else {
      const { saveNewExpense, user } = this.props;
      await saveNewExpense(user.currency, expenseData);
    }
    this.resetLocalState(isEditMode);
  };

  resetLocalState = (isEditMode) => {
    const { user } = this.props;
    this.setState((prevState) => ({
      id: isEditMode ? prevState.id : nanoid(idLength),
      ...defaultState,
      currency: user.currency,
    }));
  };

  render() {
    const { isEditMode, currencies } = this.props;
    const { description, value, currency,
      category, payment, isFormIncomplete } = this.state;

    return (
      <div className="wallet-form">
        <form className="form-container" onSubmit={ this.handleSubmit }>
          <h2 className="form-title">Despesa</h2>
          <hr />
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              name="category"
              id="category"
              value={ category }
              onChange={ this.handleChange }
            >
              {categories.map((tag) => (
                <option key={ tag } value={ tag }>{tag}</option>))}
            </select>
          </label>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              min="0"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select
              name="payment"
              id="payment"
              value={ payment }
              onChange={ this.handleChange }
            >
              {paymentMethods.map((paymentMethod) => (
                <option
                  key={ paymentMethod }
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
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => (
                <option
                  key={ coin.code }
                  value={ coin.code }
                >
                  {`${coin.name}${coin.code !== coin.name ? ` (${coin.code})` : ''}`}
                </option>))}
            </select>
          </label>
          {isEditMode ? (
            <button type="submit" className="form-btn edit" disabled={ isFormIncomplete }>
              Editar despesa
            </button>
          ) : (
            <button type="submit" className="form-btn" disabled={ isFormIncomplete }>
              Adicionar despesa
            </button>)}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: currenciesPropTypes.isRequired,
  expenseId: PropTypes.string.isRequired,
  expenses: expensesPropTypes.isRequired,
  fetchWalletCurrencies: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  saveUpdatedExpense: PropTypes.func.isRequired,
  saveNewExpense: PropTypes.func.isRequired,
  user: userPropTypes.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  isEditMode: wallet.isEditMode,
  expenseId: wallet.idToEdit,
  user: users.userList.find(({ id }) => id === wallet.walletUserId) || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchWalletCurrencies: (currency) => dispatch(thunkCurrenciesAndAddExpense(currency)),
  saveNewExpense: (currency, stateData) => {
    dispatch(thunkCurrenciesAndAddExpense(currency, stateData));
  },
  saveUpdatedExpense: (expenseData) => dispatch(saveEditedExpense(expenseData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
