import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidLogin: false,
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  };

  handleValidation = () => {
    const { email, password } = this.state;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const minPasswordLength = 5;

    const validations = [emailRegex.test(email), password.length > minPasswordLength];
    const isValidLogin = validations.every((validation) => validation);

    this.setState({ isValidLogin });
  };

  render() {
    const { email, password, isValidLogin } = this.state;
    const { saveEmail, history } = this.props;
    return (
      <div className="login-page">

        <form className="login-form" onSubmit={ () => history.push('./carteira') }>
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
            type="submit"
            disabled={ !isValidLogin }
            onClick={ () => saveEmail(email) }
          >
            Entrar

          </button>
        </form>

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
