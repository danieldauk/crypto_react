import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { Coin, Spinner } from '../../components';


class Dashboard extends Component {
  redirectToCoin = (coin) => {
    this.props.history.push(coin);
  }

  renderCoins = () => {
    const coins = this.props.coinsData.map((coin) => {
      const logo = `${coin.website_slug}_large_logo.png`;
      return (
        <Coin
          logo={logo}
          key={coin.id}
          name={coin.name}
          change={coin.quotes.EUR.percent_change_24h}
          price={coin.quotes.EUR.price}
          clicked={() => this.redirectToCoin(coin.website_slug)}
        />
      );
    });

    return (
      <div className="dashboard__coins">
        {coins}
      </div>
    );
  }

  render() {
    const { coinsData } = this.props;
    return (
      <div className="dashboard">
        {coinsData.length === 0 ? <Spinner /> : this.renderCoins()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinsData: state.coinsData,
});


export default connect(mapStateToProps)(Dashboard);
