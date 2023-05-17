import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIdToEdit, deleteExpense } from '../redux/actions';
import { expensePropTypes } from '../types';

class TableElementCard extends Component {
  render() {
    const { expense, getIdToEditExpense, removeExpense } = this.props;
    const { description, tag, method, value, currency, exchangeRates, id } = expense;
    const currencyName = exchangeRates[currency].name;
    const currencyRate = Number(exchangeRates[currency].ask);
    const convertedValue = (value * currencyRate).toFixed(2);
    const fixedCurRate = currencyRate.toFixed(2);
    const fixedValue = Number(value).toFixed(2);

    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{fixedValue}</td>
        <td>{currencyName}</td>
        <td>{fixedCurRate}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>

          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => getIdToEditExpense(id) }
          >
            Editar

          </button>

          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => removeExpense(id) }
          >
            Excluir

          </button>

        </td>
      </>
    );
  }
}

TableElementCard.propTypes = {
  expense: expensePropTypes.isRequired,
  getIdToEditExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getIdToEditExpense: (expenseId) => dispatch(getIdToEdit(expenseId)),
  removeExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableElementCard);
