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
      dispatch(fetchCoinsSuccess(response.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCoinDetails = coinSymbol => (dispatch) => {
  axios.get('https://min-api.cryptocompare.com/data/histoday', {
    params: {
      fsym: coinSymbol,
      tsym: 'EUR',
      limit: 1000,
    },
  })
    .then((response) => {
      dispatch(fetchCoinDetailsSuccess(response.data.Data));
    })
    .catch(err => console.log(err));
};

export const fetchCoinsSuccess = payload => ({
  type: actionTypes.FETCH_COINS_SUCCESS,
  payload,
});

export const fetchCoinDetailsSuccess = payload => ({
  type: actionTypes.FETCH_COIN_DETAILS_SUCCESS,
  payload,
});

export const deleteCoinDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_COIN_DETAILS,
  });
};
