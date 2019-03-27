import React from "react";
import Comment from "../../components/Comment";
import CommentWrapper from "../../components/CommentWrapper";
import API from "../../services/APIService";
import { TextArea } from "../../components/TextArea";
import { Link, Redirect } from 'react-router-dom';

import FirebaseContext from "../../components/Firebase/context";
import LockScreen from '../../components/LockScreen';



class PostDetail extends React.Component {
  state = {
    userId: "",
    title: "",
    body: "",
    author: "",
    comments: [],
    inputValue: "",
    goBack: false

  };

  componentDidMount = () => {
    // getCommentsByPostId
    const id = this.props.match.params.postId;
    // api call here using this prop, set it to state
    API.findOnePost(id).then(post =>
      this.setState({
        userId: post.data.userId,
        title: post.data.title,
        body: post.data.body
      }));
      API.getCommentsByPostId(id).then(res => this.setState({comments:res.data}))

     


  };
 

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleCommentSubmit = e => {
    e.preventDefault();
    const postId = this.props.match.params.postId;

    if (postId) {
    const newComment = {
      body: this.state.inputValue,
      userId: this.firebase.dbUserInfo._id,
      
    };

    this.lockScreen.lock();


    API.createAComment(postId, newComment)
    .then(() => {
      window.ioSocket.emit('message', `${this.firebase.dbUserInfo.displayName} just added a comment!`);
          this.setState({ goBack: true });
        })
        .catch(err => {
          console.log(err);
          window.M.toast({ html: 'Error sending comment request' });
          this.lockScreen.unlock();
        });
    } else {
      window.M.toast({ html: 'Please enter required fields' });
    }
    
  }

    


  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;
          if(this.state.goBack){
            return <Link to={`/postdetail/${this.props.match.params.postId}`} push={true} />
          } else {
          return (
            <div className='addACommentPage'>
            <div className="container">
              <div className="row">
                <div className="col l12 text-center">
                  <h1>{this.state.title}</h1>
                  <hr />
                  <h5>{this.state.body}</h5>
                </div>
              </div>

              <TextArea
                value={this.state.inputValue}
                name="inputValue"
                handleInputChange={this.handleInputChange}
                buttonName={"Reply"}
                label={"Post a reply"}
                handleFormSubmit={this.handleCommentSubmit}
              />

              <CommentWrapper>
                {this.state.comments.map(comment => 
                  <Comment
                    body={comment.body}
                    date={comment.date}
                    user={comment.userId.displayName}
                    userImage={comment.userId.image}
                  />
                )}
              </CommentWrapper>  
            </div>
            <LockScreen id="addPostLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
</div>
          );
          }
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default PostDetail;
