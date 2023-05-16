// thunkCurrencies
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const CURRENCIES_SUCCESSFUL = 'CURRENCIES_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const EXPENSE_SUCCESSFUL = 'EXPENSE_SUCCESSFUL';

const requestStarted = () => ({
  type: REQUEST_STARTED,
});
const currenciesSuccessful = (currencies) => ({
  type: CURRENCIES_SUCCESSFUL,
  payload: currencies,
});
const expenseSuccessful = (expense) => ({
  type: EXPENSE_SUCCESSFUL,
  payload: expense,
});
const requestFailed = (error) => ({
  type: REQUEST_FAILED, payload: error,
});

export function thunkCurrenciesAndAddExpense(localStateData = undefined) {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const exchangeRates = await request.json();
      if (!localStateData) {
        const currencies = Object.keys(exchangeRates)
          .filter((currency) => currency !== 'USDT');
        dispatch(currenciesSuccessful(currencies));
      } else {
        const expense = {
          ...localStateData,
          exchangeRates,
        };
        dispatch(expenseSuccessful(expense));
      }
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  };
}

// // thunkExchangeRates
// export const E_R_REQUEST_STARTED = 'E_R_REQUEST_STARTED';
// export const E_R_REQUEST_SUCCESSFUL = 'E_R_REQUEST_SUCCESSFUL';
// export const E_R_REQUEST_FAILED = 'E_R_REQUEST_FAILED';

// const eRRequestStarted = () => ({
//   type: E_R_REQUEST_STARTED,
// });
// const eRRequestSuccessful = () => ({
//   type: E_R_REQUEST_SUCCESSFUL,
// });
// const eRRequestFailed = (error) => ({
//   type: E_R_REQUEST_FAILED,
//   payload: error,
// });

// export function thunkExchangeRates() {
//   return async (dispatch) => {
//     try {
//       dispatch(eRRequestStarted());
//       const API_URL = 'https://economia.awesomeapi.com.br/json/all';
//       const request = await fetch(API_URL);
//       const data = await request.json();

//       dispatch(eRRequestSuccessful());
//       return data;
//     } catch (error) {
//       dispatch(eRRequestFailed(error.message));
//     }
//   };
// }
