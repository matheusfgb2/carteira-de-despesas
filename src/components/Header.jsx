import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../assets/logo.png';
import './Header.css';

class Header extends Component {
  state = {
    totalExpense: 0,
    currency: 'BRL',
  };

  render() {
    const { totalExpense, currency } = this.state;
    const { email } = this.props;
    return (
      <div className="header-container">
        <img src={ logo } alt="Wallet" className="header-logo" />
        <div className="user-info-container">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">
            {`Despesa total: ${totalExpense},00 `}
            <span data-testid="header-currency-field">{currency}</span>
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Header);
