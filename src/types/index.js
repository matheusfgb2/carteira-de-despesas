import PropTypes from 'prop-types';

export const exchangeRatesPropTypes = PropTypes.objectOf(
  PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
);

export const expensePropTypes = PropTypes.shape(
  {
    id: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    value: PropTypes.number,
    payment: PropTypes.string,
    currency: PropTypes.string,
    exchangeRates: exchangeRatesPropTypes,
  },
);

export const expensesPropTypes = PropTypes.arrayOf(expensePropTypes);
