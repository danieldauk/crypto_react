import React, { Component } from 'react';

export default class CoinDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.match.params.coin}
      </div>
    );
  }
}
