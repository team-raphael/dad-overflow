import React from 'react';

const Comment = (props) => {
  return (
    <div>
      
      <li class="collection-item">
        {props.author}
        {props.body}
        {props.date}

      </li>
     
    </div>
  )
};

export default Comment;