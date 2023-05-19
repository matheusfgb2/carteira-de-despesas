import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    isValidEmail: true,
    userId: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { isValidEmail } = this.state;
    const { history } = this.props;

    if (isValidEmail) {
      const { userId } = this.state;
      history.push(`./carteira/${userId}`);
    }
  };

  handleValidation = () => {
    const { email } = this.state;
    const { users } = this.props;
    const user = users.find(({ email: userEmail }) => userEmail === email);
    const isValidEmail = user !== undefined;
    const userId = isValidEmail ? user.id : null;

    this.setState({ isValidEmail, userId }, this.handleSubmit);
  };

  render() {
    const { email, isValidEmail } = this.state;
    return (
      <div className="login-page">

        <div className="login-box">
          <h2 className="login-title">Insira o email cadastrado</h2>

          <div className="inputs-container">
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </div>
          <button
            type="button"
            onClick={ this.handleValidation }
          >
            Entrar
          </button>
          <Link to="/novo-usuario">Criar usuário</Link>
          {!isValidEmail && <h3 className="field-warning">Email inválido</h3>}
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ user }) => ({
  users: user.users,
});

export default connect(mapStateToProps)(Login);
