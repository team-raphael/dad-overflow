import React from "react";
import API from "../../services/APIService";
import FirebaseContext from "../Firebase/context";
import './style.css';

import Post from '../Post/Post';

export class PostCollection extends React.Component {
  state = {
    title: "",
    body: "",
    value: "",
    posts: [],
    newDummyPost: [],
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

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
            <div className='center' id='modal-btn'>
              {this.state.posts.map((post, index) =>
                <Post
                  postId={post._id}
                  key={index}
                  title={post.title}
                  body={post.body}
                  author={post.userId && post.userId.displayName ? post.userId.displayName : ''} />
              )}
              {/* create a element and map over this.state.posts and display */}
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
