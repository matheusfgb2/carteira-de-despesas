import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import { getUserId } from '../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  state = {
    doHaveUser: true,
  };

  componentDidMount() {
    const { match: { params: { userId } },
      getCurrentUserId, users } = this.props;
    const doHaveUser = users.some(({ id }) => id === userId);
    this.setState({ doHaveUser });
    getCurrentUserId(userId);
  }

  render() {
    const { error } = this.props;
    const { doHaveUser } = this.state;

    return (
      <div className="wallet-page">

        { error || !doHaveUser ? (
          <div className="error-container">
            <h1 className="error">{`Erro: ${error || 'Usuário inexistente'}`}</h1>
          </div>
        ) : (
          <>
            <Header />

            <WalletForm />

            <Table />
          </>
        ) }

      </div>
    );
  }
}

Wallet.propTypes = {
  error: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
  getCurrentUserId: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  users: users.userList,
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUserId: (userId) => dispatch(getUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
