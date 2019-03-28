import React from "react";

const CommentWrapper = props => {
  return (
    <ul className="collection">
    {props.children}
  </ul>
  );
};

export default CommentWrapper;
