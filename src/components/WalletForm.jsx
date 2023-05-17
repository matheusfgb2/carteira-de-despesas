import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkCurrenciesAndAddExpense, saveEditedExpense } from '../redux/actions';
import { expensesPropTypes } from '../types';
import './WalletForm.css';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const defaultPayment = paymentMethods[0];
const defaultTag = tags[0];
const defaultCurrency = 'USD';

const defaultState = {
  id: 0,
  description: '',
  tag: defaultTag,
  value: '',
  method: defaultPayment,
  currency: defaultCurrency,
  isFormIncomplete: true,
};

class WalletForm extends Component {
  state = { ...defaultState };

  async componentDidMount() {
    const { fetchCurrenciesAndAddExpense } = this.props;
    await fetchCurrenciesAndAddExpense();
  }

  componentDidUpdate(prevProps) {
    const { expenseId, isEditMode, expenses } = this.props;

    if (isEditMode && !prevProps.isEditMode) {
      const expenseCopy = { ...expenses.find(({ id }) => id === expenseId) };
      const { id, description, tag, value, method, currency } = expenseCopy;
      this.setState({ id, description, tag, value, method, currency });
    }
  }

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { description, value } = this.state;
    this.setState({
      isFormIncomplete: !(description.length && value > 0),
    });
  };

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { isEditMode } = this.props;
    const { id, description, tag, value, method, currency } = this.state;
    const expenseData = { id, description, tag, value, method, currency };

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
      ...defaultState,
      id: isEditMode ? prevState.id : prevState.id + 1,
    }));
  };

  render() {
    const { isEditMode, currencies } = this.props;
    const { description, value, currency, tag, method, isFormIncomplete } = this.state;

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
                <option key={ category } value={ category }>{category}</option>))}
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
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeForm }
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
  expenseId: PropTypes.number.isRequired,
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
