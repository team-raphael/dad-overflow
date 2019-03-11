import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from './components/Nav';
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import './App.css';

class App extends Component {
  

  componentDidMount = () => {
     window.ioSocket.on('message', function (msg) {
        window.M.toast({ html: msg });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />

          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <Route component={Search} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
