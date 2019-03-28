import React from "react";

const CommentWrapper = props => {
  return (
    <ul class="collection">
    {props.children}
  </ul>
  );
};

export default CommentWrapper;
