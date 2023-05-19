import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { thunkCurrenciesAndAddExpense, saveEditedExpense } from '../redux/actions';
import { expensesPropTypes } from '../types';
import './WalletForm.css';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const defaultPayment = paymentMethods[0];
const defaultCategory = categories[0];
const defaultCurrency = 'USD';
const idLength = 6;

const defaultState = {
  description: '',
  category: defaultCategory,
  value: 0,
  payment: defaultPayment,
  currency: defaultCurrency,
  isFormIncomplete: true,
};

class WalletForm extends Component {
  state = { id: nanoid(idLength), ...defaultState };

  async componentDidMount() {
    const { fetchCurrenciesAndAddExpense } = this.props;
    await fetchCurrenciesAndAddExpense();
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

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { isEditMode } = this.props;
    const { id, description, category, value, payment, currency } = this.state;
    const expenseData = { id, description, category, value, payment, currency };

    if (isEditMode) {
      const { saveUpdatedExpense } = this.props;
      saveUpdatedExpense(expenseData);
    } else {
      const { fetchCurrenciesAndAddExpense } = this.props;
      await fetchCurrenciesAndAddExpense(expenseData);
    }

    this.resetLocalState(isEditMode);
  };

  resetLocalState = (isEditMode) => {
    this.setState((prevState) => ({
      id: isEditMode ? prevState.id : nanoid(idLength),
      ...defaultState,
    }));
  };

  render() {
    const { isEditMode, currencies } = this.props;
    const { description, value, currency,
      category, payment, isFormIncomplete } = this.state;

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
                <option key={ coin } value={ coin }>{coin}</option>))}
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
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseId: PropTypes.string.isRequired,
  expenses: expensesPropTypes.isRequired,
  fetchCurrenciesAndAddExpense: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  saveUpdatedExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  isEditMode: wallet.editor,
  expenseId: wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAndAddExpense: (stateData) => {
    dispatch(thunkCurrenciesAndAddExpense(stateData));
  },
  saveUpdatedExpense: (expenseData) => dispatch(saveEditedExpense(expenseData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
