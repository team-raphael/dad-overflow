import React from "react";
import Moment from 'react-moment';
import './style.css';

const Comment = props => {
  return (

      <li class="collection-item avatar">
      <img src={props.userImage} alt="" class="circle"/>
      <span class="userName">{props.user}</span>
      <p><span className="body">{props.body}</span><br/>
         <span class="time"><Moment fromNow>{props.date}</Moment></span>
      </p>
    </li>
    
  );
};

export default Comment;
