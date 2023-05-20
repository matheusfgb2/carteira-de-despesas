import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import { getUserId } from '../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { match: { params: { userId } },
      getCurrentUserId } = this.props;
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
  getCurrentUserId: (userId) => dispatch(getUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
