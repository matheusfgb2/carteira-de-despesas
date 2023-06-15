import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { createUser, editUser, deleteUser } from '../../../redux/actions';
import { thunkUserCurrencies } from '../../../redux/actions/thunks';
import { currenciesPropTypes, userListPropTypes } from '../../../types';

import '../style/UserForm.css';

const TIMEOUT_MOUNT_VALUE = 1;
const ID_LENGHT = 10;
const NAME_MIN_LENGTH = 3;

class UserForm extends Component {
  state = {
    id: nanoid(ID_LENGHT),
    name: '',
    email: '',
    currency: 'BRL',
    isValidName: true,
    isValidEmail: true,
    isNewEmail: true,
    isValidUser: false,
  };

  componentDidMount() {
    setTimeout(async () => {
      const { fetchUserCurrencies, isEditUser, userList, userId } = this.props;
      await fetchUserCurrencies();
      if (isEditUser) {
        const user = userList.find(({ id }) => id === userId);
        const { id, name, currency, email } = user;
        this.setState({ id, name, currency, email });
      }
    }, TIMEOUT_MOUNT_VALUE);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleValidation = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { userList } = this.props;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br|net)$/;
    const isValidName = name.length >= NAME_MIN_LENGTH;
    const isValidEmail = emailRegex.test(email);
    const isNewEmail = userList.every((user) => user.email !== email);
    const isValidUser = isValidName && isValidEmail && isNewEmail;
    this.setState({
      isValidName,
      isValidEmail,
      isNewEmail,
      isValidUser }, this.handleSubmit);
  };

  handleValidationEditMode = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const isValidName = name.length >= NAME_MIN_LENGTH;
    this.setState({ isValidName, isValidUser: isValidName }, this.handleSubmit);
  };

  handleSubmit = () => {
    const { isValidUser } = this.state;
    if (isValidUser) {
      const { id, name, email, currency } = this.state;
      const { create, edit, isEditUser, history } = this.props;
      const userData = { id, name, email, currency };
      if (isEditUser) {
        edit(userData);
      } else {
        create(userData);
      }
      history.push(`/carteira/${id}`);
    }
  };

  handleRemoveUser = (id) => {
    const { remove, history } = this.props;
    remove(id);
    history.push('/');
  };

  render() {
    const { id, name, email, currency,
      isValidName, isValidEmail, isNewEmail } = this.state;
    const { currencies, isEditUser } = this.props;
    return (
      <div>
        <form
          onSubmit={ isEditUser ? this.handleValidationEditMode : this.handleValidation }
        >
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
          {
            !isEditUser && (
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
            )
          }
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
                <option
                  key={ coin.code }
                  value={ coin.code }
                >
                  {`${coin.name}${coin.code !== coin.name ? ` (${coin.code})` : ''}`}
                </option>))}
            </select>
          </label>
          <button type="submit">{isEditUser ? 'Editar usuário' : 'Criar usuário'}</button>
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
        {isEditUser && (
          <>
            <button onClick={ () => this.handleRemoveUser(id) }>Deletar usuário</button>
            <p className="field-warning">
              A troca de moeda acarretará na remoçâo da lista de despesas
            </p>
          </>
        )}
      </div>
    );
  }
}

UserForm.propTypes = {
  currencies: currenciesPropTypes.isRequired,
  edit: PropTypes.func.isRequired,
  fetchUserCurrencies: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isEditUser: PropTypes.bool.isRequired,
  create: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userList: userListPropTypes.isRequired,
};

const mapStateToProps = ({ users }) => ({
  currencies: users.currencies,
  userList: users.userList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserCurrencies: () => dispatch(thunkUserCurrencies()),
  create: (userData) => dispatch(createUser(userData)),
  edit: (userData) => dispatch(editUser(userData)),
  remove: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
