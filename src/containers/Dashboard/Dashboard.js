import React, { Component } from 'react';
import './Dashboard.css';
import { Coin } from '../../components';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Coin />
        <Coin />
        <Coin />
        <Coin />
        <Coin />
        <Coin />
        <Coin />
        <Coin />
      </div>
    );
  }
}

export default Dashboard;
