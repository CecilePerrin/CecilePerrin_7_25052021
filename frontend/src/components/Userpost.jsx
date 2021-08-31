
import { MoreVert } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import "../styles/userPost.css"
import DeleteIcon from "@material-ui/icons/Delete";

const UserPost = ({post}) => {
    const {user} = useContext(UserContext);
    const [posts, setPosts] = useState({});
   
    console.log(post)
    const handleDeletePost = (id) => {
     axios.delete('http://localhost:4200/api/posts/:id',{ headers: { 'Authorization':localStorage.getItem('token') } })
        .then((response) => {
          const data = posts.filter((post) => post.id !== id);
          setPosts(data);
          console.log(response.data);
        })
  
        .catch(error => console.log(error));
    };
    
  
  return (
      <div className="post">
        <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                  <Link to={`/myprofile`}>
                  <img
                    className="postProfileImg"
                    src={
                    post.User.imageUrl
                    ? post.User.imageUrl
                    :  noavatar}
                    alt=""
                    />
                  </Link>
                  <span className="postUsername">{post.User.name}</span>
                  <span className="postUsername">{post.User.firstName}</span>
                  <p className="card-text"><small className="text-muted">{post.createdAt}</small></p>
              </div>
              <div className="postTopRight">
                  <MoreVert />
                  {user.isAdmin || user.id === post.UserId ? (
                  <DeleteIcon
                  aria-label="Delete this post"
                  className="icon delete infobulle"
                  style={{ fontSize: 30 }}
                  onClick={() => handleDeletePost(post.id)}
                  />
                  ) : null}
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post.content}</span>
              <img className="postImg" src={post.imgUrl} alt="" />
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