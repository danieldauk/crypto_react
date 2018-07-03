import * as actionTypes from './actionTypes';

const initialState = {
  coinsData: [],
  coinDetails: [],
};

const fetchCoins = (state, action) => {
  const coinsArray = [];
  for (const coin in action.payload) {
    coinsArray.push(action.payload[coin]);
  }
  return {
    ...state,
    coinsData: coinsArray,
  };
};

const fetchCoinDetails = (state, action) => {
  console.log(action.payload);
  return {
    ...state,
    coinDetails: action.payload,
  };
};

const deleteCoinDetails = state => ({
  ...state,
  coinDetails: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COINS_SUCCESS:
      return fetchCoins(state, action);
    case actionTypes.FETCH_COIN_DETAILS_SUCCESS:
      return fetchCoinDetails(state, action);
    case actionTypes.DELETE_COIN_DETAILS:
      return deleteCoinDetails(state);
    default:
      return state;
  }
};

export default reducer;
