import React from "react";

const Like = ({ liked, onLike }) => {
  const classes = liked
    ? "fa fa-heart clickable fa-2x"
    : "fa fa-heart-o clickable fa-2x";
  return (
    <span onClick={onLike}>
      <i className={classes} aria-hidden="true"></i>
    </span>
  );
};

export default Like;
