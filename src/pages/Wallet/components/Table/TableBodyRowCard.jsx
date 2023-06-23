import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getExpenseIdToEdit, deleteExpense, showTable } from '../../../../redux/actions';
import { expensePropTypes } from '../../../../types';

class TableBodyRowCard extends Component {
  render() {
    const { expense, getIdToEditExpense, removeExpense, handleShowTable } = this.props;

    const { description, category, payment, value,
      currency, exchangeRates, id } = expense;

    const fixedValue = Number(value).toFixed(2);
    const currencyName = exchangeRates[currency].name;
    const currencyRate = Number(exchangeRates[currency].ask);
    const fixedCurRate = currencyRate.toFixed(2);
    const convertedValue = (value * currencyRate).toFixed(2);
    const { namein } = exchangeRates[currency];

    return (
      <tr>
        <td>{description}</td>
        <td>{category}</td>
        <td>{payment}</td>
        <td>{fixedValue}</td>
        <td>{currencyName}</td>
        <td>{fixedCurRate}</td>
        <td>{convertedValue}</td>
        <td>{namein}</td>
        <td>
          <button
            type="button"
            onClick={ () => { getIdToEditExpense(id); handleShowTable(); } }
          >
            Editar
          </button>
          <button
            type="button"
            onClick={ () => removeExpense(id) }
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
  handleShowTable: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getIdToEditExpense: (expenseId) => dispatch(getExpenseIdToEdit(expenseId)),
  removeExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
  handleShowTable: () => dispatch(showTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBodyRowCard);
