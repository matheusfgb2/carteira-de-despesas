import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { thunkCurrenciesAndAddExpense, createUser } from '../../../redux/actions';
import './Form.css';

// Create User Form
class Form extends Component {
  state = {
    name: '',
    email: '',
    currency: 'USD',
    isValidName: true,
    isValidEmail: true,
    isValidUser: false,
  };

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
  }

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  };

  handleValidation = () => {
    const { name, email } = this.state;
    const nameMinLength = 3;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br|net)$/;
    const isValidName = name.length >= nameMinLength;
    const isValidEmail = emailRegex.test(email);
    const isValidUser = isValidName && isValidEmail;
    this.setState({ isValidName, isValidEmail, isValidUser });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, email, currency } = this.state;
    const { newUser } = this.props;
    const userData = { name, email, currency };
    newUser(userData);
  };

  render() {
    const { name, email, currency, isValidName, isValidEmail, isValidUser } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form onSubmit={ this.handleSubmitForm }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChangeForm }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChangeForm }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeForm }
            >
              {currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>))}
            </select>
          </label>
          <button type="submit" disabled={ !isValidUser }>Criar usuário</button>
        </form>
        {!isValidName && name.length > 0 && (
          <p className="field-warning">
            Insira um nome de usuário de pelo menos 3 caracteres
          </p>
        ) }
        {!isValidEmail && email.length > 0 && (
          <p className="field-warning">
            Insira um email válido
          </p>
        ) }
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  newUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrenciesAndAddExpense()),
  newUser: (userData) => dispatch(createUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
