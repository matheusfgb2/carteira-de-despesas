import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
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
};

const mapStateToProps = ({ wallet }) => ({
  error: wallet.errorMessage,
});

export default connect(mapStateToProps)(Wallet);
