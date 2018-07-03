import React, { Component } from 'react';
import { connect } from 'react-redux';

class CoinChart extends Component {
  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinDetails: state.coinDetails,
});

export default connect(mapStateToProps)(CoinChart);
