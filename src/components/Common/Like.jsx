import React from "react";
import { Animated } from "react-animated-css";

const Like = ({ liked, onLike }) => {
  const classes = liked
    ? "fa fa-heart clickable fa-2x"
    : "fa fa-heart-o clickable fa-2x";

  const styles = liked ? { color: "#f23f3f" } : {};
  return (
    <span onClick={onLike}>
      <Animated
        animationIn="zoomIn"
        animationOut="fadeOut"
        isVisible={true}
        animateOnMount={true}
      >
        <i className={classes} style={styles} aria-hidden="true"></i>
      </Animated>
    </span>
  );
};

export default Like;
