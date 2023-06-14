const BASE_URL = `https://min-api.cryptocompare.com/data`;
const API_KEY = `f850268ef07b85f48ec70a8393eb0cbd8b9f533e38cb8d2be75ab625987e428a`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/top/mktcapfull?limit=100&tsym=USD&api_key=${API_KEY}`).then(response => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/all/coinlist?fsym=${coinId}`).then(response => response.json());
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/pricemultifull?fsyms=${coinId}&tsyms=USD`).then(response => response.json());
}

export function fetchHistoDay(coinId: string) {
  return fetch(`${BASE_URL}/v2/histoday?fsym=${coinId}&tsym=USD`).then(response => response.json());
}

export function fetchHistoHour(coinId: string) {
  return fetch(`${BASE_URL}/v2/histohour?fsym=${coinId}&tsym=USD`).then(response => response.json());
}

export function fetchHistoMinute(coinId: string) {
  return fetch(`${BASE_URL}/v2/histominute?fsym=${coinId}&tsym=USD`).then(response => response.json());
}
