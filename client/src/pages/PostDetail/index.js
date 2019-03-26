import React from "react";
import Comment from "../../components/Comment";
import CommentWrapper from "../../components/CommentWrapper";
import API from "../../services/APIService";

class PostDetail extends React.Component {
  state = {
    title: "",
    body: "",
    comments: []
  };

  componentDidMount = () => {
    const id = this.props.match.params.postId;
    // api call here using this prop, set it to state
    API.findOnePost(id).then(post => API.getUserById(post.data.userId).then(res => console.log(res.data)))
    // API.findOnePost(id).then(post => console.log(post));

    //
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h2>{this.state.body}</h2>
        {/* input with button */}

        <CommentWrapper>
          {this.state.comments.map(comment => {
            // eslint-disable-next-line no-unused-expressions
            <Comment
              body={this.state.comment.body}
              author={this.state.comment.author}
              date={this.state.comment.date}
            />;
          })}
        </CommentWrapper>
      </div>
    );
  }
}

export default PostDetail;
