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
      const { currency, value } = expense;
      const rating = Number(expense.exchangeRates[currency].ask);
      const finalValue = rating * value;
      return (total + finalValue);
    }, 0);

    return totalOfExpenses.toFixed(2);
  };

  render() {
    const { name, email, currency } = this.props;
    const totalOfExpenses = this.getTotalOfExpenses();
    return (
      <div className="header-container">
        <img src={ logo } alt="Wallet" className="header-logo" />
        <div className="user-info-container">
          <p>{`${name} | ${email}`}</p>
          <p>{`Despesa total: ${totalOfExpenses} ${currency}`}</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  currency: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  expenses: expensesPropTypes.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  email: users.user.email,
  name: users.user.name,
  currency: users.user.currency,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
