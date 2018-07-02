import React from 'react';
import './Coin.css';

export default ({ logo, name, price }) => (
  <div className="coin">
    <div className="coin__container">
      <div className="coin__logo">
        <img src={require(`../../assets/coin_logos/${logo}`)} alt="logo" />
      </div>
      <div className="coin__name">
        {name}
      </div>
      <div className="coin__price">
        {price}
      </div>
    </div>
  </div>

);
