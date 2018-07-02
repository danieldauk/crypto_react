import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchCoinsData = () => (dispatch) => {
  axios.get('https://api.coinmarketcap.com/v2/ticker/', {
    params: {
      limit: 8,
      convert: 'EUR',
    },
  })
    .then((response) => {
      console.log(response.data.data);
      dispatch(fetchSuccess(response.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCoinDetails = coin => (dispatch) => {
  axios.get(`https://api.coinmarketcap.com/v2/ticker/${coin}/`)
    .then((response) => {
      console.log(response.data);
    })
    .catch(err => console.log(err));
};

export const fetchSuccess = payload => ({
  type: actionTypes.FETCH_COINS_SUCCESS,
  payload,
});
