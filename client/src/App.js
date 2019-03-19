import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from './components/Nav';
import Forum from "./pages/Forum";
import ToDo from './pages/ToDo';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import './App.css';
import FirebaseContext from './components/Firebase/context';
import * as FirebaseApp from 'firebase/app';
import API from './services/APIService';

class App extends Component {

  componentDidMount = () => {
    window.ioSocket.on('message', function (msg) {
      window.M.toast({ html: msg });
    });

    //Attach an on authoriztion change envent and send the user to the profile page if they don't exist in the datbase
    FirebaseApp.auth().onAuthStateChanged((user) => {

      if (user) {
        console.log("Firebase User Info: ", user);
        API.getAllUsers()
          .then(users => {
            console.log(users);
          })
          .catch(err => {
            console.log("Trouble obtaining the user data from the database: ", err);
          })
      }

    });
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {
          firebase => {
            this.firebase = firebase;

            return (
              <BrowserRouter>
                <div className="App">
                  <Nav />

                  <Switch>
                    <Route exact path="/" component={Forum} />
                    <Route exact path="/todo" component={ToDo} />
                    <Route exact path="/login" component={Login} />
                    <Route component={NoMatch} />
                  </Switch>
                </div>
              </BrowserRouter>
            )
          }
        }

      </FirebaseContext.Consumer>


    );
  }
}

export default App;
