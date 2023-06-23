import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getWalletUserId } from '../../redux/actions';
import { userListPropTypes } from '../../types';

import { Header, WalletForm, Table } from './components';
import './style/Wallet.css';

class Wallet extends React.Component {
  state = {
    doHaveUser: true,
  };

  componentDidMount() {
    const { match: { params: { userId } },
      getUserId, userList } = this.props;
    const doHaveUser = userList.some(({ id }) => id === userId);
    this.setState({ doHaveUser });
    getUserId(userId);
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
  getUserId: PropTypes.func.isRequired,
  userList: userListPropTypes.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  userList: users.userList,
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getUserId: (userId) => dispatch(getWalletUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
