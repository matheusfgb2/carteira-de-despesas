import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { createUser, editUser, deleteUser } from '../../../redux/actions';
import { fetchUserCurrencies } from '../../../services/api';
import { userListPropTypes } from '../../../types';

import '../style/UserForm.css';

const TIMEOUT_MOUNT_VALUE = 1;
const ID_LENGHT = 10;
const NAME_MIN_LENGTH = 3;

class UserForm extends Component {
  state = {
    userCurrencies: [],
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
      const { isEditUser, userList, userId } = this.props;

      const userCurrencies = await fetchUserCurrencies();
      this.setState({ userCurrencies });

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
      const { createNewUser, editPrevUser, isEditUser, history } = this.props;

      const userData = { id, name, email, currency };
      if (isEditUser) {
        editPrevUser(userData);
      } else {
        createNewUser(userData);
      }

      history.push(`/carteira/${id}`);
    }
  };

  handleRemoveUser = (id) => {
    const { deletePrevUser, history } = this.props;
    deletePrevUser(id);
    history.push('/');
  };

  render() {
    const { userCurrencies, id, name, email, currency,
      isValidName, isValidEmail, isNewEmail } = this.state;
    const { isEditUser } = this.props;

    if (userCurrencies.error) return <h1>{userCurrencies.error}</h1>;

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
              {userCurrencies.map((coin) => (
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
  createNewUser: PropTypes.func.isRequired,
  deletePrevUser: PropTypes.func.isRequired,
  editPrevUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isEditUser: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  userList: userListPropTypes.isRequired,
};

const mapStateToProps = ({ users }) => ({
  userList: users.userList,
});

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (userData) => dispatch(createUser(userData)),
  editPrevUser: (userData) => dispatch(editUser(userData)),
  deletePrevUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
