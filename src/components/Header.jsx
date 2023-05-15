import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../assets/logo.png';
import './Header.css';

class Header extends Component {
  render() {
    const { email, totalOfExpenses } = this.props;
    return (
      <div className="header-container">
        <img src={ logo } alt="Wallet" className="header-logo" />
        <div className="user-info-container">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p>
            Despesa total:
            <span data-testid="total-field">{` ${totalOfExpenses.toFixed(2)}`}</span>
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalOfExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  totalOfExpenses: wallet.totalOfExpenses,
});

export default connect(mapStateToProps)(Header);
