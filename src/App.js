/* eslint-disable import/first */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Error from './components/Error';
import Success from './components/Success';
import './App.css';
import { isMobile } from 'react-device-detect';

class App extends Component {
  renderContent = () => {
    if (isMobile) {
      return <div> This content is unavailable on mobile</div>
    }
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/menu" component={Menu} />
            <Route path="/cart" component={Cart} />
            <Route path="/Success" component={Success} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  render() {
    return this.renderContent();
  }
}

export default App;