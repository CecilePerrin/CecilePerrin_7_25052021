
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PictureProfile from "../assets/helsdraw.png";
import imgPost from '../assets/helsdraw.png'
import { UserContext } from "../components/UserContext.jsx";
import "../styles/userPost.css"

const UserPost = () => {
    const {user} = useContext(UserContext);
 
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/Home`}>
              <img
                className="postProfileImg"
                src={PictureProfile}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.name}</span>
            <span className="postUsername">{user.Firstname}</span>
            <p className="card-text"><small className="text-muted">il y a 20minutes</small></p>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Voici une illustration de mon avatar fait par un amis Helsinki</span>
          <img className="postImg" src={imgPost} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"  
            />
            <span className="postLikeCounter">0 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> Commentaires</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPost;