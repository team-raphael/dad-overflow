import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from './components/Nav';
import Forum from "./pages/Forum";
import ToDo from './pages/ToDo';
import NoMatch from './pages/NoMatch';
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
            <Route exact path="/" component={Forum} />
            <Route exact path="/todo" component={ToDo} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
