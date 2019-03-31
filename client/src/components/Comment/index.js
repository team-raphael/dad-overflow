import React from "react";
import Moment from 'react-moment';
import './style.css';

const Comment = props => {
  let userLiked = false;
  if (props.likedUserIds.includes(props.userId)) {
    userLiked = true;
  }

  const likeIcon = () => {
    //Only display like button if user is logged in
    if (props.userId) {
      return (
        <i className={userLiked ? "thumbsUp fas fa-thumbs-up fa-lg" : " thumbsUp far fa-thumbs-up fa-lg"} onClick={props.handleThumbClick}></i>
      )
    }
  }

  return (

    <li className="collection-item avatar">

      <img src={props.userImage} alt="" className="circle" />
      <div className="userName marginBottom">{props.user}</div>
      <div className="comment-body marginBottom">{props.body}</div>
      <div>
        <span>
          {likeIcon()} {props.likedUserIds ? props.likedUserIds.length : "0"} <span className="likes-text">likes</span>
        </span>
        <span className="time right"><Moment calendar>{props.date}</Moment></span>
      </div>
    </li>

  );
};

export default Comment;
