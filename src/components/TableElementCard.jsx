import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, getTotalOfExpenses } from '../redux/actions/wallet';

class TableElementCard extends Component {
  render() {
    const { expense, removeExpense, getTotalExpenses } = this.props;
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
            data-testid="delete-btn"
            onClick={ () => { removeExpense(id); getTotalExpenses(); } }
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
  getTotalExpenses: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
  getTotalExpenses: () => dispatch(getTotalOfExpenses()),
});

export default connect(null, mapDispatchToProps)(TableElementCard);
