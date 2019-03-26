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
    posts: []
  };

  componentDidMount = () => {
    API.getPostsWithLimit()
      .then(dbPosts => {
        this.setState({ posts: dbPosts.data });
      });
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
