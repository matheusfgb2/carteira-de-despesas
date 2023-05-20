import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import { getUser, getUserId } from '../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { match: { params: { userId } },
      getCurrentUser, getCurrentUserId } = this.props;
    getCurrentUser(userId);
    getCurrentUserId(userId);
  }

  render() {
    const { error } = this.props;

    return (
      <div className="wallet-page">

        { error ? (
          <div className="error-container">
            <h1 className="error">{`Error: ${error}`}</h1>
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
  getCurrentUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
  getCurrentUserId: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (userId) => dispatch(getUser(userId)),
  getCurrentUserId: (userId) => dispatch(getUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
