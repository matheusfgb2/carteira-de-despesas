import {
  getNewUserCurrencies, getWalletCurrencies, saveNewExpense, usersRequestFailed,
  usersRequestStarted, walletRequestFailed, walletRequestStarted,
} from '.';

// users
export const thunkNewUserCurrencies = () => async (dispatch) => {
  try {
    dispatch(usersRequestStarted());
    const API_URL = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(API_URL);
    const exchangeRates = await request.json();
    const currencies = ['BRL', ...Object.keys(exchangeRates)
      .filter((currency) => currency !== 'USDT')];
    dispatch(getNewUserCurrencies(currencies));
  } catch (error) {
    console.log(error);
    dispatch(usersRequestFailed(error.message));
  }
};

// wallet
const fetchWalletCurrencies = async (userCurrency) => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/available';
  const request = await fetch(API_URL);
  const rates = await request.json();
  const ratesCodes = Object.keys(rates);
  let currencyNames = '';

  const currencies = ratesCodes.reduce((acc, key) => {
    const currencyCodes = key.split('-');
    console.log(currencyCodes);
    const regexp = new RegExp(`\\b${userCurrency}\\b`, 'gi');
    const hasCurrencyInKey = regexp.test(currencyCodes[1]);
    if (hasCurrencyInKey) {
      currencyNames = rates[key].split('/');
      const currency = { name: currencyNames[0], code: currencyCodes[0] };
      return [...acc, currency];
    }
    return acc;
  }, []);

  const selfCurrency = { name: currencyNames[1], code: userCurrency };

  return [selfCurrency, ...currencies];
};

const fetchExpenseExchRates = async (currencies, userCurrency) => {
  const exchangeRatesList = await Promise.all(
    currencies.map(async (currency) => {
      if (currency.code !== userCurrency) {
        const API_URL = `https://economia.awesomeapi.com.br/last/${currency.code}-${userCurrency}`;
        const request = await fetch(API_URL);
        const data = await request.json();
        const dataKey = Object.keys(data);
        data[dataKey].ask = Number(data[dataKey].ask);
        return data[dataKey];
      }
      return { ...currency, ask: 1 };
    }),
  );

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

  // exchangeRates[userCurrency].name = (
  //   userCurrency === 'USD' ? exchangeRates.BRL.namein : exchangeRates.USD.namein
  // );
  // exchangeRates[userCurrency].namein = '-';

  return exchangeRates;
};

export const thunkCurrenciesAndAddExpense = (
  userCurrency,
  expenseData = undefined,
) => async (dispatch) => {
  try {
    dispatch(walletRequestStarted());
    const currencies = await fetchWalletCurrencies(userCurrency);
    dispatch(getWalletCurrencies(currencies));

    if (expenseData) {
      const exchangeRates = await fetchExpenseExchRates(currencies, userCurrency);
      const expense = {
        ...expenseData,
        value: Number(expenseData.value),
        exchangeRates,
      };
      dispatch(saveNewExpense(expense));
      return;
    }
  } catch (error) {
    console.log(error);
    dispatch(walletRequestFailed(error.message));
  }
};
