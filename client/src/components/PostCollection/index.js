import React from "react";
import API from "../../services/APIService";
import FirebaseContext from "../Firebase/context";
<<<<<<< HEAD
import './style.css';
=======
>>>>>>> 9a1802ab864ffdf1a4f24619da0c929b73d78c08
import { Link } from "react-router-dom";
import './style.css';

import Post from '../Post/Post';

export class PostCollection extends React.Component {
  state = {
    title: "",
    body: "",
    value: "",
    posts: [],
    newDummyPost: [],
    currentPost: [],
  };

  componentDidMount = () => {
    API.getPosts()
      .then(dbPosts => {
        this.setState({ posts: dbPosts.data });
        console.log(this.state.posts);
      })



  }

  handleModalClick = () => {
    window.$("#modal1").modal("open");
    console.log("click");
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const newPost = { title: this.state.title, body: this.state.body, userId: this.firebase.dbUserInfo._id };
    API.createPost(newPost).then(post => console.log(post.data));
    this.setState({ newDummyPost: newPost });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.title);
    console.log(this.state.body);
  };

  handleCommentClick = id => {
     API.findOnePost(id).then(dbPost => this.setState({ currentPost: dbPost.data }) )


  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
            <div id='modal-btn'>
              <Link to={"/addapost"} className="waves-effect waves-light btn modal-trigger">New Post</Link>
              {this.state.posts.map((post, index) =>
                <Post
                  key={index}
                  title={post.title}
                  body={post.body}
                  author={firebase.firebaseUserInfo ? firebase.firebaseUserInfo.displayName : ''} />
              )}
              {/* create a element and map over this.state.posts and display */}
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
