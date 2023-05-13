const fetchExchangeRates = async () => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(API_URL);
  const data = await request.json();

  return data;
};
export default fetchExchangeRates;
