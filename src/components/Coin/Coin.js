import React from 'react';
import './Coin.css';
import { IoArrowGraphDownRight, IoArrowGraphUpRight } from 'react-icons/lib/io/';

export default ({
  logo, name, price, change, clicked,
}) => (
  <div onClick={clicked} className="coin">
    <div className="coin__container">
      <div className="coin__logo">
        <img src={require(`../../assets/coin_logos/${logo}`)} alt="logo" />
      </div>
      <div className="coin__name">
        {name}
      </div>
      <div className="coin__quote">
        <div className="coin__quote__price">
          {`EUR ${price.toFixed(2)}`}
        </div>
        <div className="coin__quote__change" style={change < 0 ? { color: '#B5219F' } : { color: '#4DD9E8' }}>
          {`${change}%`}
          {change < 0 ? <IoArrowGraphDownRight /> : <IoArrowGraphUpRight />}
        </div>
      </div>

    </div>
  </div>

);
