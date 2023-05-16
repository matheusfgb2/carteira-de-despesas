import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, deleteExpense, getTotalOfExpenses } from '../redux/actions';

class TableElementCard extends Component {
  handleClickToRemove = (expenseId) => {
    const { expenses, removeExpense } = this.props;
    const filteredExpenses = expenses.filter(({ id }) => id !== expenseId);
    // Update expenses id
    // filteredExpenses.forEach((expense, index) => {
    //   expense.id = index;
    // });
    removeExpense(filteredExpenses);
  };

  render() {
    const { expense, reviseExpense, getTotalExpenses } = this.props;
    const { description, tag, method, value, currency, exchangeRates, id } = expense;
    const currencyName = exchangeRates[currency].name;
    const fixedValue = Number(value).toFixed(2);
    const currencyRate = Number(exchangeRates[currency].ask);
    const convertedValue = (value * currencyRate).toFixed(2);

    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{fixedValue}</td>
        <td>{currencyName}</td>
        <td>{currencyRate.toFixed(2)}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>

          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => { reviseExpense(id); getTotalExpenses(); } }
          >
            Editar

          </button>

          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => { this.handleClickToRemove(id); getTotalExpenses(); } }
          >
            Excluir

          </button>

        </td>
      </>
    );
  }
}

TableElementCard.propTypes = {
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string,
      name: PropTypes.string,
    }),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getTotalExpenses: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  reviseExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  reviseExpense: (expenseId) => dispatch(editExpense(expenseId)),
  removeExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
  getTotalExpenses: () => dispatch(getTotalOfExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableElementCard);
