import * as actionTypes from './actionTypes';

const initialState = {
  coinsData: [],
};

const fetchCoins = (state, action) => {
  const coinsArray = [];
  for (const coin in action.payload) {
    coinsArray.push(action.payload[coin]);
  }
  console.log(coinsArray);
  return {
    ...state,
    coinsData: coinsArray,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COINS_SUCCESS:
      return fetchCoins(state, action);
    default:
      return state;
  }
};

export default reducer;
