import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expensesPropTypes } from '../types';
import logo from '../assets/logo.png';
import './Header.css';

class Header extends Component {
  getTotalOfExpenses = () => {
    const { expenses } = this.props;
    const totalOfExpenses = expenses.reduce((total, expense) => {
      const { currency } = expense;
      const rating = expense.exchangeRates[currency].ask;
      const finalValue = Number(rating) * Number(expense.value);
      return (total + finalValue);
    }, 0);

    return totalOfExpenses.toFixed(2);
  };

  render() {
    const { email } = this.props;
    const totalOfExpenses = this.getTotalOfExpenses();
    return (
      <div className="header-container">
        <img src={ logo } alt="Wallet" className="header-logo" />
        <div className="user-info-container">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p>
            {'Despesa total: '}
            <span data-testid="total-field">{totalOfExpenses}</span>
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: expensesPropTypes.isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
