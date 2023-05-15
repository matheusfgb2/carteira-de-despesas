// thunkCurrencies
export const CUR_REQUEST_STARTED = 'CUR_REQUEST_STARTED';
export const CUR_REQUEST_SUCCESSFUL = 'CUR_REQUEST_SUCCESSFUL';
export const CUR_REQUEST_FAILED = 'CUR_REQUEST_FAILED';

const curRequestStarted = () => ({
  type: CUR_REQUEST_STARTED,
});
const curRequestSuccessful = (currencies) => ({
  type: CUR_REQUEST_SUCCESSFUL,
  payload: currencies,
});
const curRequestFailed = (error) => ({
  type: CUR_REQUEST_FAILED, payload: error,
});

export function thunkCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(curRequestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const data = await request.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');

      dispatch(curRequestSuccessful(currencies));
    } catch (error) {
      dispatch(curRequestFailed(error.message));
    }
  };
}

// thunkExchangeRates
export const E_R_REQUEST_STARTED = 'E_R_REQUEST_STARTED';
export const E_R_REQUEST_SUCCESSFUL = 'E_R_REQUEST_SUCCESSFUL';
export const E_R_REQUEST_FAILED = 'E_R_REQUEST_FAILED';

const eRRequestStarted = () => ({
  type: E_R_REQUEST_STARTED,
});
const eRRequestSuccessful = () => ({
  type: E_R_REQUEST_SUCCESSFUL,
});
const eRRequestFailed = (error) => ({
  type: E_R_REQUEST_FAILED, payload: error,
});

export function thunkExchangeRates() {
  return async (dispatch) => {
    try {
      dispatch(eRRequestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const data = await request.json();

      dispatch(eRRequestSuccessful());
      return data;
    } catch (error) {
      dispatch(eRRequestFailed(error.message));
    }
  };
}
