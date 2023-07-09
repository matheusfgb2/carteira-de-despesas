import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  saveEditedExpense,
  showExpenseForm,
  thunkCurrenciesAndAddExpense,
} from '../../../redux/actions';

import {
  currenciesPropTypes,
  expensesPropTypes,
  userPropTypes,
} from '../../../types';

import '../style/WalletForm.css';

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
    const { isEditMode, currencies, isFormVisible, handleShowForm } = this.props;
    const { description, value, currency,
      category, payment, isFormIncomplete } = this.state;

    return (
      <div className="wallet-form">
        {
          isFormVisible ? (
            <form className="form-container" onSubmit={ this.handleSubmit }>
              <FontAwesomeIcon
                icon={ faTimes }
                className="close-icon"
                onClick={ () => handleShowForm(false) }
              />
              <br />
              <h2 className="form-title">Despesa</h2>
              <div className="input-with-label">
                <label htmlFor="description">
                  Descrição:
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </div>
              <div className="input-with-label">
                <label htmlFor="category">
                  Categoria:
                </label>
                <select
                  name="category"
                  id="category"
                  value={ category }
                  onChange={ this.handleChange }
                >
                  {categories.map((tag) => (
                    <option key={ tag } value={ tag }>{tag}</option>))}
                </select>
              </div>
              <div className="input-with-label">
                <label htmlFor="value">
                  Valor:
                </label>
                <input
                  type="number"
                  min="0"
                  name="value"
                  id="value"
                  value={ value }
                  onChange={ this.handleChange }
                />
              </div>
              <div className="input-with-label">
                <label htmlFor="payment">
                  Pagamento:
                </label>
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
              </div>
              <div className="input-with-label">
                <label htmlFor="currency">
                  Moeda:
                </label>
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
              </div>
              {isEditMode ? (
                <button type="submit" className="form-btn edit">
                  Editar despesa
                </button>
              ) : (
                <button type="submit" className="form-btn" disabled={ isFormIncomplete }>
                  Adicionar despesa
                </button>)}
            </form>
          ) : (
            <button
              className="form-btn"
              onClick={ handleShowForm }
            >
              Nova despesa
            </button>
          )
        }
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
  handleShowForm: PropTypes.func.isRequired,
  isFormVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  isEditMode: wallet.isEditMode,
  isFormVisible: wallet.isFormVisible,
  expenseId: wallet.idToEdit,
  user: users.userList.find(({ id }) => id === wallet.walletUserId) || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchWalletCurrencies: (currency) => dispatch(thunkCurrenciesAndAddExpense(currency)),
  saveNewExpense: (currency, stateData) => {
    dispatch(thunkCurrenciesAndAddExpense(currency, stateData));
  },
  saveUpdatedExpense: (expenseData) => dispatch(saveEditedExpense(expenseData)),
  handleShowForm: (showForm = true) => dispatch(showExpenseForm(showForm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
