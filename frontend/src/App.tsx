import React from 'react';
import './App.css';
import Home from './component/home/home';
import SellerJoin from './component/sellerJoin/sellerJoin';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/login/login';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/seller/join" component={SellerJoin} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    )
  }
}



export default App;
