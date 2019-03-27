import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from './components/Nav';
import Forum from "./pages/Forum";
import ToDo from './pages/ToDo';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddaPost from './pages/AddaPost';
import AddToDo from './pages/AddToDo';
import './App.css';
import * as FirebaseApp from 'firebase/app';
import API from './services/APIService';
import FirebaseContext from './components/Firebase/context';
import Firebase from './components/Firebase/Firebase';
import PostDetail from './pages/PostDetail';

class App extends Component {

  state = {
    firebase: new Firebase()
  };

  componentDidMount = () => {
    //Setup a listener for when the user's login state changes and record the changes in the component state
    FirebaseApp.auth().onAuthStateChanged((user) => {

      this.setState({
        firebase: {
          ...this.state.firebase,
          firebaseUserInfo: user,
          dbUserInfo: null
        }
      });

      //Check the database for this user and set the state to that user
      if (user) {

        API.getUserByEmail(user.email)
          .then(dbUsers => {
            if (dbUsers.data && dbUsers.data.length > 0) {
              this.setState({
                firebase: {
                  ...this.state.firebase,
                  dbUserInfo: dbUsers.data[0]
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
            window.M.toast({ html: 'Error obtaining user from the database!' });
          });
      }
    });
  };


  render() {

    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <BrowserRouter>
          <div className="App">
            <Nav />

            <Switch>
              <Route exact path="/" component={Forum} />
              <Route exact path="/todo" component={ToDo} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/addapost" component={AddaPost} />
              <Route exact path="/addtodo" component={AddToDo} />
              <Route exact path="/postdetail/:postId" component={PostDetail} />
              <Route component={NoMatch} />
            </Switch>

          </div>
        </BrowserRouter>
      </FirebaseContext.Provider>
    );


  }
}

export default App;
