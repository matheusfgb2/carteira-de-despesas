import { CREATE_USER, GET_NEW_USER_CURRENCIES } from './actionTypes';
import { requestStarted, requestFailed } from './wallet';

const getNewUserCurrencies = (currencies) => ({
  type: GET_NEW_USER_CURRENCIES,
  payload: currencies,
});

export const thunkNewUserCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const API_URL = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(API_URL);
    const exchangeRates = await request.json();
    const currencies = Object.keys(exchangeRates)
      .filter((currency) => currency !== 'USDT');
    dispatch(getNewUserCurrencies(currencies));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const createUser = (userData) => ({
  type: CREATE_USER,
  payload: userData,
});
