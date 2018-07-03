import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import coinDescription from '../../assets/cryptocurrencyData/cryptocurrencyData.js';
import './CoinDetails.css';
import { CoinChart } from '..';

class CoinDetails extends Component {
  state = {
    currentCoin: '',
  }


  componentDidMount() {
    this.checkCoin();
  }

  componentDidUpdate() {
    if (this.state.currentCoin === '') {
      this.checkCoin();
    }
  }

  checkCoin = () => {
    let coinSymbol;
    for (const coin in this.props.coinsData) {
      if (this.props.coinsData[coin].website_slug === this.props.match.params.coin) {
        coinSymbol = this.props.coinsData[coin].symbol;
        this.setState({ currentCoin: this.props.coinsData[coin] });
        break;
      }
    }

    if (coinSymbol) {
      this.props.fetchCoinDetails(coinSymbol);
    } else if (this.props.coinsData.length !== 0) {
      this.props.history.push('/');
    }
  }

  renderLogo = () => <img src={require(`../../assets/coin_logos/${this.state.currentCoin.website_slug}_large_logo.png`)} alt="logo" />


  render() {
    console.log(this.props.coinDetails);
    return (
      <div className="coinDetails">
        <div className="coinDetails__description">
          {this.renderLogo()}
          <h3>
            {this.state.currentCoin.name}
          </h3>
          <p>
            {coinDescription[this.state.currentCoin.website_slug].description}
          </p>
        </div>
        <div className="coinDetails__chart">
          {this.props.coinDetails.length !== 0 ? <CoinChart /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinsData: state.coinsData,
  coinDetails: state.coinDetails,
});

export default connect(mapStateToProps, actions)(CoinDetails);
