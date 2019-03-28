import React from "react";
import Moment from 'react-moment';
import './style.css';

const Comment = props => {
  return (

    <li className="collection-item avatar">
      <img src={props.userImage} alt="" className="circle" />
      <span className="userName">{props.user}</span>
      <p><span className="body">{props.body}</span><br />
        <span className="time"><Moment fromNow>{props.date}</Moment></span>
      </p>
    </li>

  );
};

export default Comment;
