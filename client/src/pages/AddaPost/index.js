import './style.css';
import React, { Component } from 'react';
import FirebaseContext from '../../components/Firebase/context';

class AddaPost extends Component {

  onSubmit = e => {
    e.preventDefault();

    const addPostForm = document.querySelector("#addPostForm");

    if (addPostForm.checkValidity()) {
      
      window.location.href = "/";
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

            return (
              <div className="white-text">
                <div className="container">
                  <form id="addPostForm">
                    <div className="row">
                      <div className="input-field col s12">
                        <input id="last_name" type="text" className="validate" required pattern="^[a-zA-Z1-9].*" />
                        <label for="last_name">Title</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea id="postBody" className="materialize-textarea validate" required pattern="^[a-zA-Z1-9].*"></textarea>
                        <label for="postBody">Body</label>
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
                </div>
              </div>
            )
          }
        }

      </FirebaseContext.Consumer>
    )
  }
}

export default AddaPost;