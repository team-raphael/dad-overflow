import React from "react";
import API from "../../services/APIService";
import FirebaseContext from "../Firebase/context";
import './style.css';
import LockScreen from '../LockScreen';

import Post from '../Post/Post';

export class PostCollection extends React.Component {
  state = {
    title: "",
    body: "",
    value: "",
    posts: []
  };

  componentDidMount = () => {

    this.lockScreen.lock();
    API.getPostsWithLimit()
      .then(dbPosts => {
        this.setState({ posts: dbPosts.data });
      })
      .finally(() => this.lockScreen.unlock());
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
              <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
