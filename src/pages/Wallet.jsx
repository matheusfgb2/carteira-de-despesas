import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">

        <Header />

        <WalletForm />

        <Table />

      </div>
    );
  }
}

export default Wallet;
