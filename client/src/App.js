import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Nav from './components/Nav';
import Forum from "./pages/Forum";
import ToDo from './pages/ToDo';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';
import FirebaseContext from './components/Firebase/context';
import * as FirebaseApp from 'firebase/app';
import API from './services/APIService';

class App extends Component {

  state = {
    toProfile: false
  };

  componentDidMount = () => {
    window.ioSocket.on('message', function (msg) {
      window.M.toast({ html: msg });
    });

    //Attach an on authoriztion change envent and send the user to the profile page if they don't exist in the datbase
    FirebaseApp.auth().onAuthStateChanged((user) => {

      this.firebase.userInfo = {};

      if (user) {
        API.getUserByEmail(user.email)
          .then(dbUsers => {

            if (dbUsers.data.length > 0) {
              this.firebase.userInfo = {
                db: dbUsers.data[0],
                firebase: user
              }
            } else {
              //Redirect the user to the profile page
              this.setState({
                toProfile: true
              });
            }

            console.log("DB User Info: ", this.firebase.userInfo);
            //this.props.history.push(`/profile`);
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

            if (this.state.toProfile === true) {
              return (
                <BrowserRouter>
                  <div className="App">
                    <Redirect to="/profile" />
                  </div>
                </BrowserRouter>
              )
            }

            return (
              <BrowserRouter>
                <div className="App">
                  <Nav />

                  <Switch>
                    <Route exact path="/" component={Forum} />
                    <Route exact path="/todo" component={ToDo} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profile" component={Profile} />
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
