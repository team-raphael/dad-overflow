import React from "react";
import Moment from 'react-moment';
import './style.css';

const Comment = props => {
  let userLiked = false;
  if (props.likedUserIds.includes(props.userId)) {
    userLiked = true;
  }
  return (

    <li className="collection-item avatar">

      <img src={props.userImage} alt="" className="circle" />
      <div className="userName marginBottom">{props.user}</div>
      <div className="comment-body marginBottom">{props.body}</div>
      <div>
        <span>
          <i className={userLiked ? "thumbsUp fas fa-thumbs-up fa-lg" : " thumbsUp far fa-thumbs-up fa-lg"} onClick={props.handleThumbClick}></i> {props.likedUserIds ? props.likedUserIds.length : "0"} <span className="likes-text">likes</span>
        </span>
        <span className="time right"><Moment calendar>{props.date}</Moment></span>
      </div>
    </li>

  );
};

export default Comment;
