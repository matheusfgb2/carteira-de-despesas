import {
  REQUEST_STARTED,
  REQUEST_FAILED,
  GET_WALLET_USER_ID,
  GET_WALLET_CURRENCIES,
  GET_ID_TO_EDIT,
  SAVE_NEW_EXPENSE,
  SAVE_EDITED_EXPENSE,
  DELETE_EXPENSE,
} from './actionTypes';

export const requestStarted = () => ({
  type: REQUEST_STARTED,
});
export const requestFailed = (error) => ({
  type: REQUEST_FAILED, payload: error,
});
const getWalletCurrencies = (currencies) => ({
  type: GET_WALLET_CURRENCIES,
  payload: currencies,
});
const saveNewExpense = (expenseData) => ({
  type: SAVE_NEW_EXPENSE,
  payload: { expenseData },
});

export const getWalletUserId = (userId) => ({
  type: GET_WALLET_USER_ID,
  payload: userId,
});
export const getIdToEdit = (IdToEdit) => ({
  type: GET_ID_TO_EDIT,
  payload: IdToEdit,
});
export const saveEditedExpense = (expenseData) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: { expenseData },
});
export const deleteExpense = (idToRemove) => ({
  type: DELETE_EXPENSE,
  payload: { idToRemove },
});

const fetchCurrencies = async (userCurrency) => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/available';
  const request = await fetch(API_URL);
  const rates = await request.json();
  const ratesTitles = Object.keys(rates);

  const ratesWithCurrency = ratesTitles.reduce((acc, key) => {
    const hasCurrencyInKey = key.split('-')[1].includes(userCurrency);
    return hasCurrencyInKey ? [...acc, key] : acc;
  }, []);

  const currencies = ratesWithCurrency
    .reduce((acc, currency) => [...acc, currency.split('-')[0]], []);

  return [userCurrency, ...currencies];
};

const fetchExchangeRates = async (currencies, userCurrency) => {
  const exchangeRatesList = await Promise.all(currencies.map(async (currCurrency) => {
    if (currCurrency !== userCurrency) {
      const API_URL = `https://economia.awesomeapi.com.br/last/${currCurrency}-${userCurrency}`;
      const request = await fetch(API_URL);
      const data = await request.json();
      const dataKey = Object.keys(data);
      return data[dataKey];
    }
    return { code: userCurrency, ask: '1', name: userCurrency };
  }));

  let exchangeRates = {};
  exchangeRatesList.forEach((rate) => {
    exchangeRates = {
      ...exchangeRates,
      [rate.code]: {
        ...rate,
        name: `${rate.name.split('/')[0]} (${rate.code})`,
        namein: rate.name.split('/')[1],
      } };
  });

  exchangeRates[userCurrency].name = (
    userCurrency === 'USD' ? exchangeRates.BRL.namein : exchangeRates.USD.namein
  );
  exchangeRates[userCurrency].namein = '-';

  return exchangeRates;
};

export const thunkCurrenciesAndAddExpense = (
  userCurrency,
  expenseData = undefined,
) => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const currencies = await fetchCurrencies(userCurrency);
    dispatch(getWalletCurrencies(currencies));

    if (expenseData) {
      const exchangeRates = await fetchExchangeRates(currencies, userCurrency);
      const expense = {
        ...expenseData,
        value: Number(expenseData.value),
        exchangeRates,
      };
      dispatch(saveNewExpense(expense));
      return;
    }
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};
