import React from "react";
import Moment from 'react-moment';
import './style.css';

const Comment = props => {
  console.log(props)
  let userLiked = false;
  if(props.likedUserIds.includes(props.userId)) {
    userLiked = true;
  }
  return (

    <li className="collection-item avatar">
    
      <img src={props.userImage} alt="" className="circle" />
      <span className="userName">{props.user}</span>
      <p><span className="body">{props.body}</span><br />
        <span className="time"><Moment fromNow>{props.date}</Moment></span>
      </p>
      <h6 className="secondary-content likes-text">{props.likedUserIds ? props.likedUserIds.length : "0"} <span className="likes-text">likes</span><i className={userLiked ? "thumbsUp fas fa-thumbs-up fa-lg" : " thumbsUp far fa-thumbs-up fa-lg"} onClick={props.handleThumbClick}></i></h6>
    </li>

  );
};

export default Comment;
