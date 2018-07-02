import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { Coin } from '../../components';
import * as actions from '../../store/actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchCoinsData();
  }

  renderCoins = () => this.props.coinsData.map((coin) => {
    const logo = `${coin.website_slug}_large_logo.png`;
    return (
      <Coin
        logo={logo}
        key={coin.id}
        name={coin.name}
        price={coin.quotes.EUR.price}
      />
    );
  })

  render() {
    return (
      <div className="dashboard">
        {this.renderCoins()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinsData: state.coinsData,
});


export default connect(mapStateToProps, actions)(Dashboard);
