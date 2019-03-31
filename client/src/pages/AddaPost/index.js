import './style.css';
import React, { Component } from 'react';
import FirebaseContext from '../../components/Firebase/context';
import API from '../../services/APIService';
import { Link, Redirect } from 'react-router-dom';
import LockScreen from '../../components/LockScreen';

class AddaPost extends Component {

  state = {
    postTitle: '',
    postBody: '',
    goBack: false
  }

  firebase = null;

  componentDidMount = () => {
    const postTitle = document.getElementById("postTitle");
    if (postTitle) {
      postTitle.focus();
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
    const addPostForm = document.querySelector("#addPostForm");

    if (addPostForm.checkValidity()) {
      const newPost = {
        title: this.state.postTitle,
        body: this.state.postBody,
        userId: this.firebase.dbUserInfo._id
      };

      this.lockScreen.lock();

      API.createPost(newPost, this.firebase.firebaseUserToken)
        .then(() => {
          window.ioSocket.emit('message', `${this.firebase.dbUserInfo.displayName} just added a post titled '${newPost.title}'!`);
          this.setState({ goBack: true });
        })
        .catch(err => {
          console.log(err);
          window.M.toast({ html: 'Error sending post request' });
          this.lockScreen.unlock();
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
              return <Redirect to="/" push={true} />
            } else {
              return (
                <div id="addAPostPage" className="marginTopMedium">
                  <div className="container">
                    {firebase.dbUserInfo &&
                      <form id="addPostForm">
                        <Link to={"/"}><i className="small material-icons marginBottomMedium backArrow">arrow_back</i></Link>
                        <div className="row">
                          <div className="input-field col s12">
                            <input id="postTitle" type="text" className="validate" required pattern="^[a-zA-Z1-9].*" name="postTitle" value={this.state.postTitle} onChange={this.handleInputChange} />
                            <label htmlFor="postTitle">Title</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea id="postBody" name="postBody" className="materialize-textarea validate" required pattern="^[a-zA-Z1-9].*" value={this.state.postBody} onChange={this.handleInputChange}></textarea>
                            <label htmlFor="postBody">Body</label>
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
                  <LockScreen id="addPostLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
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