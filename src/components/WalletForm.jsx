import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunkCurrencies from '../redux/actions/wallet/thunkCurrencies';
import './WalletForm.css';

class WalletForm extends Component {
  state = {
    description: '',
    category: 'Alimentação',
    value: '',
    payment: 'Dinheiro',
    currency: '',
  };

  async componentDidMount() {
    const { fetchCurrencies, currencies } = this.props;
    await fetchCurrencies();

    this.setState({ currency: currencies[0] });
  }

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { isLoading, currencies, error } = this.props;
    const { description, value, currency, category, payment } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    if (isLoading) return (<h4 className="loading">Loading...</h4>);
    if (error) return (<h4 className="error-message">{`Erro: ${error}`}</h4>);

    return (
      <div className="wallet-form">
        <form className="form-container" onSubmit={ () => {} }>

          <h2 className="form-title">Despesa</h2>

          <hr />

          <label
            htmlFor="description"
            data-testid="description-input"
          >
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChangeForm }
            />
          </label>

          <label
            htmlFor="category"
          >
            Categoria:
            <select
              name="category"
              id="category"
              data-testid="tag-input"
              value={ category }
              onChange={ this.handleChangeForm }
            >
              {categories.map((cat) => (
                <option key={ cat } value={ cat }>{cat}</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="value"
            data-testid="value-input"
          >
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChangeForm }
            />
          </label>

          <label
            htmlFor="payment"
          >
            Método de pagamento:
            <select
              name="payment"
              id="payment"
              data-testid="method-input"
              value={ payment }
              onChange={ this.handleChangeForm }
            >
              {paymentMethods.map((paymentMethod) => (
                <option
                  key={ paymentMethod }
                  value={ paymentMethod }
                >
                  {paymentMethod}

                </option>
              ))}
            </select>
          </label>

          <label
            htmlFor="currency"
          >
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeForm }
            >
              {currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <button type="submit">Adicionar despesa</button>

        </form>
      </div>
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
