import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { Dashboard, CoinDetails } from './containers';

export default () => (
  <div className="App">
    <Route path="/" exact component={Dashboard} />
    <Route path="/:coin" exact component={CoinDetails} />
  </div>
);
