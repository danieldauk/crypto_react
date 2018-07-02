import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class CoinDetails extends Component {
  componentDidUpdate() {
    let coinId;
    for (const coin in this.props.coinsData) {
      if (this.props.coinsData[coin].website_slug === this.props.match.params.coin) {
        coinId = this.props.coinsData[coin].id;
        break;
      }
    }

    if (coinId) {
      this.props.fetchCoinDetails(coinId);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        {this.props.match.params.coin}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinsData: state.coinsData,
});

export default connect(mapStateToProps, actions)(CoinDetails);
