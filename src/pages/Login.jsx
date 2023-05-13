import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions/user';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidLogin: false,
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.loginValidation);
  };

  handleClick = () => {
    const { saveEmail, history } = this.props;
    const { email } = this.state;

    saveEmail(email);
    history.push('./carteira');
  };

  loginValidation = () => {
    const { email, password } = this.state;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const doesEmailHaveDotCom = email.includes('.com');
    const minPasswordLength = 5;

    const validations = [
      emailRegex.test(email),
      doesEmailHaveDotCom,
      password.length > minPasswordLength,
    ];
    const isValidLogin = validations.every((validation) => validation);

    this.setState({ isValidLogin });
  };

  render() {
    const { email, password, isValidLogin } = this.state;
    return (
      <div className="login-page">

        <div className="login-box">
          <h1 className="login-title">Login</h1>

          <div className="inputs-container">
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Email"
              data-testid="email-input"
              onChange={ this.handleChangeInput }
            />
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="******"
              data-testid="password-input"
              onChange={ this.handleChangeInput }
            />
          </div>
          <button
            type="button"
            disabled={ !isValidLogin }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(getEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
