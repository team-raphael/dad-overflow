import React, { Component } from 'react';
import './style.css';
import API from '../../services/APIService';
import { CommentsList } from '../CommentsList';
import { CommentsText } from '../CommentsText';
import FirebastContext from '../Firebase/context';

export class CommentsCollection extends Component {
  state = {

  }
};

componentDidMount() {
  this.getComments();
};

getComments = () => {
  API.getComments(this.firebase.dbUserInfo).then( res =>
    this.setState({ listOfComments: res.data })
  )
};

handleInputChange = e => {

};

handleFormSubmit = e => {
  e.preventDefault();
  
}

