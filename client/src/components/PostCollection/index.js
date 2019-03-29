import React from "react";
import FirebaseContext from "../Firebase/context";
import './style.css';
import LockScreen from '../LockScreen';

import Post from '../Post/Post';

export class PostCollection extends React.Component {
  state = {
    title: "",
    body: "",
    value: ""
  };  

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
            <div className='center'>
              {this.props.posts.map((post, index) =>
                <Post
                  postId={post._id}
                  key={index}
                  isEven={index % 2 === 0 ? true : false}
                  title={post.title}
                  body={post.body}
                  author={post.userId && post.userId.displayName ? post.userId.displayName : ''} />
              )}
              <LockScreen id="postCollectionPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}

