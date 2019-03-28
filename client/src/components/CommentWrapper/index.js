import React from "react";
import './style.css';

const CommentWrapper = props => {
  return (
    <ul className="commentCollectionContainer collection">
    {props.children}
  </ul>
  );
};

export default CommentWrapper;
