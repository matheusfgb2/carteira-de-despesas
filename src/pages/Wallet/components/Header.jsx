import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { expensesPropTypes, userPropTypes } from '../../../types';

import logo from '../../../assets/logo.png';

import '../style/Header.css';

class Header extends Component {
  getTotalOfExpenses = () => {
    const { expenses } = this.props;
    const totalOfExpenses = expenses.reduce((total, expense) => {
      const { currency, value } = expense;
      const rating = expense.exchangeRates[currency].ask;
      const finalValue = rating * value;
      return (total + finalValue);
    }, 0);

    return totalOfExpenses.toFixed(2);
  };

  render() {
    const { user, userId } = this.props;
    const { name, email, currency } = user;
    const totalOfExpenses = this.getTotalOfExpenses();
    return (
      <div className="header-container">
        <Link to="/">
          <img src={ logo } alt="Wallet" className="header-logo" />
        </Link>
        <div className="user-info-container">
          <p>{`${name} | ${email}`}</p>
          <p>{`Despesa total: ${totalOfExpenses} ${currency}`}</p>
          <Link to={ `/editar-usuario/${userId}` }>Editar Usuário</Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  expenses: expensesPropTypes.isRequired,
  user: userPropTypes.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  user: users.userList.find(({ id }) => id === wallet.walletUserId) || {},
  expenses: wallet.expenses,
  userId: wallet.walletUserId,
});

export default connect(mapStateToProps)(Header);
