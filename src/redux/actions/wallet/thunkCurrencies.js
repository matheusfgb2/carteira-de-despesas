export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

const requestStarted = () => ({ type: REQUEST_STARTED });

const requestSuccessful = (currencies) => ({
  type: REQUEST_SUCCESSFUL,
  payload: currencies,
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: error,
});

export default function thunkCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const API_URL = 'https://economia.awesomeapi.com.br/json/all';
      const request = await fetch(API_URL);
      const data = await request.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');

      dispatch(requestSuccessful(currencies));
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  };
}
