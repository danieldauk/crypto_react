import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import './App.css';
import { Dashboard, CoinDetails } from './containers';

class App extends Component {
  componentDidMount() {
    this.props.fetchCoinsData();
    this.props.fetchTotalMarketCap();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/:coin" component={CoinDetails} />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(null, actions)(App));
