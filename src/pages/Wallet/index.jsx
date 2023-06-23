import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getWalletUserId, showTable } from '../../redux/actions';
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
    const { error, isTableVisible, handleShowTable } = this.props;
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
            {isTableVisible ? <WalletForm /> : (
              <button onClick={ handleShowTable }>Adicionar despesa</button>
            )}

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
  isTableVisible: PropTypes.bool.isRequired,
  handleShowTable: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users, wallet }) => ({
  userList: users.userList,
  error: wallet.errorMessage,
  isTableVisible: wallet.isTableVisible,
});

const mapDispatchToProps = (dispatch) => ({
  getUserId: (userId) => dispatch(getWalletUserId(userId)),
  handleShowTable: () => dispatch(showTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
