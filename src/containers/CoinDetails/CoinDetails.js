import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { IoArrowGraphDownRight, IoArrowGraphUpRight } from 'react-icons/lib/io/';
import * as actions from '../../store/actions';
import coinDescription from '../../assets/cryptocurrencyData/cryptocurrencyData.js';
import './CoinDetails.css';
import { CoinChart, MarketCapPie } from '..';
import { Spinner } from '../../components';

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

  renderPrice = () => {
    const { currentCoin } = this.state;
    if (currentCoin !== '') {
      const { price, percent_change_24h } = this.state.currentCoin.quotes.EUR;
      return (
        <div className="coinDetails__details__price">
          <h4>
            Current Price
          </h4>
          <h3>
            {'EUR '}
            {(price).toFixed(2)}
            {' '}

            <span style={percent_change_24h < 0 ? { color: '#B5219F' } : { color: '#4DD9E8' }}>
              (
              {`${percent_change_24h}%`}
              {percent_change_24h < 0 ? <IoArrowGraphDownRight /> : <IoArrowGraphUpRight />}
              )

            </span>


          </h3>
        </div>


      );
    }
    return null;
  }

  renderSupply = () => {
    const { currentCoin } = this.state;
    if (currentCoin !== '') {
      const { circulating_supply, max_supply, symbol } = this.state.currentCoin;
      return (
        <div className="coinDetails__details__supply">
          <div>
            <h4>
              Circulating Supply
            </h4>
            <h3>
              {`${symbol} ${d3.format(',.8r')(circulating_supply)}`}
            </h3>
          </div>
          <div>
            <h4>
              Max Supply
            </h4>
            <h3>
              {`${symbol} ${d3.format(',.8r')(max_supply)}`}

            </h3>
          </div>

        </div>
      );
    }
    return null;
  }

  renderLogo = () => <img src={require(`../../assets/coin_logos/${this.state.currentCoin.website_slug}_large_logo.png`)} alt="logo" />


  renderView = () => {
    const { website_slug, rank, name } = this.state.currentCoin;

    return (
      <div className="coinDetails__view">
        <div className="coinDetails__description">
          {this.renderLogo()}
          <h3>
            {name}
          </h3>
          <span>
            Rank
            {' '}
            {rank}
          </span>
          <p>
            {coinDescription[website_slug].description}
          </p>
        </div>
        <div className="coinDetails__details">
          {(this.props.coinDetails.length !== 0) ? <CoinChart /> : null}
          <div className="coinDetails__details__market">
            <div className="coinDetails__details__quotes">

              {this.renderPrice()}
              {this.renderSupply()}
            </div>
            {(this.props.coinDetails.length !== 0) ? <MarketCapPie currentMarketCap={this.state.currentCoin.quotes.EUR.market_cap} /> : null}


          </div>
        </div>
      </div>
    );
  }

  render() {
    const { coinDetails } = this.props;

    return (
      <div className="coinDetails">
        {coinDetails.length === 0 ? <Spinner /> : this.renderView()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinsData: state.coinsData,
  coinDetails: state.coinDetails,
});

export default connect(mapStateToProps, actions)(CoinDetails);
