import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expensesPropTypes, userPropTypes } from '../types';

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
    const { user } = this.props;
    const { name, email, currency } = user;
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
  expenses: expensesPropTypes.isRequired,
  user: userPropTypes.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  user: users.userList.find(({ id }) => id === wallet.walletUserId) || {},
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
