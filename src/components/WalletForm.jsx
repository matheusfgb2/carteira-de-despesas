import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunkCurrencies from '../redux/actions/wallet/thunkCurrencies';
import './WalletForm.css';

class WalletForm extends Component {
  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
  }

  render() {
    const { isLoading, currencies, error } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    if (isLoading) return (<h4 className="loading">Loading...</h4>);
    if (error) return (<h4 className="error-message">{`Erro: ${error}`}</h4>);

    return (
      <form className="wallet-form">
        <div className="form-container">

          <h2 className="form-title">Adicionar despesa</h2>

          <hr />

          <label
            htmlFor="description"
            className="form-label"
            data-testid="description-input"
          >
            Descrição:
            <input type="text" name="description" id="description" />
          </label>

          <label
            htmlFor="tags"
            className="form-label"
          >
            Categoria:
            <select
              name="tags"
              id="tags"
              defaultValue={ tags[0] }
              data-testid="tag-input"
            >
              {tags.map((tag) => (
                <option key={ tag } value={ tag }>{tag}</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="value"
            className="form-label"
            data-testid="value-input"
          >
            Valor:
            <input type="text" name="value" id="value" />
          </label>

          <label
            htmlFor="payment"
            className="form-label"
          >
            Método de pagamento:
            <select
              name="payment"
              id="payment"
              defaultValue={ paymentMethods[0] }
              data-testid="method-input"
            >
              {paymentMethods.map((payment) => (
                <option key={ payment } value={ payment }>{payment}</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="currencies"
            className="form-label"
          >
            Moeda:
            <select
              name="currencies"
              id="currencies"
              data-testid="currency-input"
              defaultValue={ currencies[0] }
            >
              {currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>
              ))}
            </select>
          </label>

        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  isLoading: wallet.isFetching,
  error: wallet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
