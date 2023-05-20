import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIdToEdit, deleteExpense } from '../redux/actions';
import { expensePropTypes } from '../types';

class TableBodyRowCard extends Component {
  render() {
    const { expense, userId, getIdToEditExpense, removeExpense } = this.props;
    const { description, category, payment, value,
      currency, exchangeRates, id } = expense;
    const currencyName = exchangeRates[currency].name;
    const currencyRate = Number(exchangeRates[currency].ask);
    const convertedValue = (value * currencyRate).toFixed(2);
    const fixedCurRate = currencyRate.toFixed(2);
    const fixedValue = Number(value).toFixed(2);
    return (
      <tr>
        <td>{description}</td>
        <td>{category}</td>
        <td>{payment}</td>
        <td>{fixedValue}</td>
        <td>{currencyName}</td>
        <td>{fixedCurRate}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            onClick={ () => getIdToEditExpense(id) }
          >
            Editar
          </button>
          <button
            type="button"
            onClick={ () => removeExpense(userId, id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

TableBodyRowCard.propTypes = {
  expense: expensePropTypes.isRequired,
  getIdToEditExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  expenses: wallet.expenses,
  error: wallet.errorMessage,
  userId: users.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getIdToEditExpense: (expenseId) => dispatch(getIdToEdit(expenseId)),
  removeExpense: (userId, expenseId) => dispatch(deleteExpense(userId, expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBodyRowCard);
