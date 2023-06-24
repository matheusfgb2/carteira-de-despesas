import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getWalletUserId } from '../../redux/actions';
import { userListPropTypes } from '../../types';

import { Header, WalletForm, Table } from './components';
import './style/Wallet.css';

class Wallet extends React.Component {
  state = {
    hasUser: true,
  };

  componentDidMount() {
    const { match: { params: { userId } },
      getUserId, userList } = this.props;
    const hasUser = userList.some(({ id }) => id === userId);
    this.setState({ hasUser });
    getUserId(userId);
  }

  render() {
    const { error } = this.props;
    const { hasUser } = this.state;

    return (
      <div className="wallet-page">

        { error || !hasUser ? (
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
  isFormVisible: wallet.isFormVisible,
});

const mapDispatchToProps = (dispatch) => ({
  getUserId: (userId) => dispatch(getWalletUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
