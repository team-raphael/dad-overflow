import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import API from "../../services/APIService";

export class Post extends React.Component {
    state = {
         lengthOfComments: ""
    };
    componentDidMount() {
        API.getCommentsByPostId(this.props.postId).then(res => this.setState({lengthOfComments: res.data.length }));

    };

  

  render() {
  return (
    // <div className='aos-init aos-animate' data-aos={props.isEven ? "fade-right" : 'fade-left'}>
    <div data-aos="flip-up" data-aos-offset="110">
      <div className="postcard card hoverable">
        <div className="row card-image left-align">
          <div className="col s12 m9">
            <h1 className="post-title title">
              <Link
                className="postTitleLink"
                to={`/postdetail/${this.props.postId}`}
              >
                {this.props.title}
              </Link>
            </h1>
            <h5 className="body hide-on-small-only marginBottom">
              {this.props.body}
            </h5>
            <div className="valign-wrapper">
              <div className="postImageContainer">
                <img className="postImage" src={this.props.userImage} alt="" />
              </div>
              <div className="postPersonContainer">
                <div className="postAuthor">{this.props.author}</div>
                <div className="postDate">
                  <Moment calendar>{this.props.date}</Moment>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m3 comment-length right-align hide-on-small-only">{this.state.lengthOfComments === 1 ? `${'1 comment'}` : `${this.state.lengthOfComments} ${'comments'}`}</div>
          <div className="col s12 small-comment left-align hide-on-med-and-up">{this.state.lengthOfComments === 1 ? `${'1 comment'}` : `${this.state.lengthOfComments} ${'comments'}`}</div>
        </div>
      </div>
    </div>
  );
  }
};

