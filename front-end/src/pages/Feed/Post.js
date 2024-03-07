import { Link } from "react-router-dom";
import React from "react";
import "./Post.css";
import {
  IoPeopleCircleOutline,
  IoHeartOutline,
  IoChatboxOutline,
} from "react-icons/io5";

const Post = (props) => {
  return (
    <>
      <div className="post">
        <div className="post-header">
          <IoPeopleCircleOutline className="post-icon" />
          <p>{props.username}</p>
        </div>
        <img className="post-image" src={props.image} alt="" />
        <div className="post-details">
          <div className="post-icons">
            <IoHeartOutline className="post-icon" />
            <IoChatboxOutline className="post-icon" />
          </div>
          <p>{props.caption}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
