import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { thunkCurrenciesAndAddExpense, createUser } from '../../../redux/actions';
import { userListPropTypes } from '../../../types';
import './Form.css';

const idLength = 10;

class Form extends Component {
  state = {
    id: nanoid(idLength),
    name: '',
    email: '',
    currency: 'USD',
    isValidName: true,
    isValidEmail: true,
    isNewEmail: true,
    isValidUser: false,
  };

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleValidation = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { userList } = this.props;
    const nameMinLength = 3;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br|net)$/;
    const isValidName = name.length >= nameMinLength;
    const isValidEmail = emailRegex.test(email);
    const isNewEmail = userList.every((user) => user.email !== email);
    const isValidUser = isValidName && isValidEmail && isNewEmail;
    this.setState({
      isValidName,
      isValidEmail,
      isNewEmail,
      isValidUser }, this.handleSubmit);
  };

  handleSubmit = () => {
    const { isValidUser } = this.state;
    if (isValidUser) {
      const { id, name, email, currency } = this.state;
      const { newUser, history } = this.props;
      const userData = { id, name, email, currency };
      newUser(userData);
      history.push(`/carteira/${id}`);
    }
  };

  render() {
    const { name, email, currency, isValidName, isValidEmail, isNewEmail } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form onSubmit={ this.handleValidation }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>))}
            </select>
          </label>
          <button type="submit">Criar usuário</button>
        </form>
        {!isValidName && (
          <p className="field-warning">
            Insira um nome de usuário com pelo menos 3 caracteres
          </p>
        ) }
        {!isValidEmail && (
          <p className="field-warning">
            Insira um email válido
          </p>
        ) }
        {!isNewEmail && (
          <p className="field-warning">
            Email já cadastrado
          </p>
        ) }
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  newUser: PropTypes.func.isRequired,
  userList: userListPropTypes.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  currencies: wallet.currencies,
  userList: users.userList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrenciesAndAddExpense()),
  newUser: (userData) => dispatch(createUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
