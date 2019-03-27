import React from "react";
import Comment from "../../components/Comment";
import CommentWrapper from "../../components/CommentWrapper";
import API from "../../services/APIService";
import { TextArea } from "../../components/TextArea";
import FirebaseContext from "../../components/Firebase/context";

class PostDetail extends React.Component {
  state = {
    userId: "",
    title: "",
    body: "",
    author: "",
    comments: [],
    inputValue: ""
  };

  componentDidMount = () => {
    const id = this.props.match.params.postId;
    // api call here using this prop, set it to state
    API.findOnePost(id).then(post =>
      this.setState({
        userId: post.data.userId,
        title: post.data.title,
        body: post.data.body
      })

     
    );
    // API.getUserById(post.data.userId).then(res => console.log(res.data)))
    // API.findOnePost(id).then(post => console.log(post));

    console.log('comments:', this.state.comments)
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
    console.log('postid:', postId)
    const newComment = {
      body: this.state.inputValue,
      postId: postId,
      userId: this.firebase.dbUserInfo.displayName._id,
      
    };
    console.log('user id:', this.firebase.dbUserInfo._id)

    // API.createAComment(postId, newComment).then(comment => this.setState(state => ({comments: state.comments.concat(comment)})))
    // API.createAComment(postId, newComment).then(comment => console.log(comment.data))
    API.createAComment(postId, {body: newComment.body, userId: newComment.userId, postId: newComment.postId}).then((comment) => console.log(comment)).catch(err => console.log(err))
  
  
}

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
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
                placeholder={"Post a reply"}
                handleFormSubmit={this.handleCommentSubmit}
              />

              {/* <CommentWrapper>
                {this.state.comments.map(comment => {
                  // eslint-disable-next-line no-unused-expressions
                  <Comment
                    body={this.state.comment.body}
                    author={this.state.comment.author}
                    date={this.state.comment.date}
                  />;
                })}
              </CommentWrapper> */}
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default PostDetail;
