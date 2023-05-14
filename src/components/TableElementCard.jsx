import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TableElementCard extends Component {
  render() {
    const { expense } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expense;

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
        <td />
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
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
};

export default TableElementCard;
