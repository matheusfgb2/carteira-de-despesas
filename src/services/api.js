const fetchCurrencies = async () => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/available';
  const request = await fetch(API_URL);
  const currencies = await request.json();
  return currencies;
};

export const fetchUserCurrencies = async () => {
  try {
    const rates = await fetchCurrencies();
    const ratesKeys = Object.keys(rates);

    const repeatedCurrencies = ratesKeys.map((key) => (
      { code: key.split('-')[1], name: rates[key].split('/')[1] }
    ));
    const currenciesCodes = [];

    const currencies = repeatedCurrencies
      .filter((currency) => {
        const isDuplicate = currenciesCodes.includes(currency.code);
        if (!isDuplicate) {
          currenciesCodes.push(currency.code);
          return true;
        }
        return false;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return currencies;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const fetchWalletCurrencies = async (userCurrency) => {
  const rates = await fetchCurrencies();
  const ratesKeys = Object.keys(rates);
  let currencyNames = '';

  const unsortedCurrencies = ratesKeys
    .reduce((acc, key) => {
      const currencyCodes = key.split('-');
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

  const currencies = [selfCurrency, ...unsortedCurrencies]
    .sort((a, b) => a.name.localeCompare(b.name));

  return currencies;
};

export const fetchExpenseExchRates = async (currencies, userCurrency) => {
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

  return exchangeRates;
};
