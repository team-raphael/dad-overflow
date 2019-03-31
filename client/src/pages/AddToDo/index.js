import './style.css';
import React, { Component } from 'react';
import FirebaseContext from '../../components/Firebase/context';
import API from '../../services/APIService';
import { Link, Redirect } from 'react-router-dom';
import LockScreen from '../../components/LockScreen';

class AddaPost extends Component {

  state = {
    taskBody: '',
    goBack: false
  }

  componentDidMount = () => {
    const taskBody = document.getElementById("taskBody");
    if (taskBody) {
      taskBody.focus();
    }
    window.scrollTo(0, 0);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const addPostForm = document.querySelector("#addTaskForm");

    if (addPostForm.checkValidity()) {
      const newTask = {
        body: this.state.taskBody
      };

      this.lockScreen.lock();

      API.createATask(this.firebase.dbUserInfo._id, newTask, this.firebase.firebaseUserToken)
        .then(() => this.setState({ goBack: true }))
        .catch(err => {
          this.lockScreen.unlock();
          console.log(err);
          window.M.toast({ html: 'Error sending post request' });
        });
    } else {
      window.M.toast({ html: 'Please enter required fields' });
    }

  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {
          firebase => {
            this.firebase = firebase;

            if (this.state.goBack) {
              return <Redirect to="/todo" push={true} />
            } else {
              return (
                <div id="addTaskPage" className="marginTopMedium">
                  <div className="container">
                    {firebase.dbUserInfo &&
                      <form id="addTaskForm">
                        <Link to={"/todo"}><i className="small material-icons marginBottomMedium backArrow">arrow_back</i></Link>
                        <div className="row">
                          <div className="input-field col s12">
                            <input type="text" id="taskBody" name="taskBody" className="validate" required pattern="^[a-zA-Z1-9].*" value={this.state.taskBody} onChange={this.handleInputChange}></input>
                            <label htmlFor="taskBody">Add a task</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>
                              Submit<i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                      </form>
                    }

                  </div>
                  <LockScreen id="addToDoPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                </div>
              )
            }
          }
        }

      </FirebaseContext.Consumer>
    )
  }
}

export default AddaPost;