
import { MoreVert } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import "../styles/userPost.css"
import Likes from "./Likes";
import Comment from "./Comment";
import CommentList from "./CommentList"

const UserPost = ({post}) => {

  const {user} = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const date = new Date(post.createdAt).toLocaleString();
  const [comments, setComments] = useState(null);
  const [displayComponent, setDisplayComponent] = useState(false)
  const [inputReset, setInputReset] = useState(0)
  

  const handleDeletePost = async (id) => {
		const answer = window.confirm("êtes vous sûr?");
    if (answer) {
     await axios.delete(`http://localhost:4200/api/posts/${id}`,{ headers: { 'Authorization':localStorage.getItem('token') } })
        .then((response) => {
          const data = posts.filter((post) => post.id !== id);
          setPosts(data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
  };

	
  const handleComment = async () =>{
    await axios.get(`http://localhost:4200/api/posts/${post.id}/comments`, { headers: { Authorization:localStorage.getItem('token') } })
    .then((response) => {
      setComments(response.data.comments);
      setInputReset(inputReset +1)
    })
    .catch(error => console.log(error));
  }


  useEffect(() => {
		if (!comments) {
			handleComment();
		}
	}, [setComments]);
 
  const handleShowComment = () =>{
      setDisplayComponent(!displayComponent)
    
  }
    
  return (
      <div className="post">
        <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/UserWall/${user.name}`}>
                  <img
                    className="postProfileImg"
                    src={
                    post.User.imageUrl = "0"
                    ? noavatar
                    :  post.User.imageUrl}
                    alt=""
                  />
                </Link>
                <span className="postUsername">{post.User.name} {post.User.firstName}</span>
                <p className="card-text"><small className="text-muted">{date}</small></p>
              </div>
              <div className="postTopRight">
                  {user.id === post.User.id ? (
                  <MoreVert 
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
              <Likes
                key={post.id}
                post={post}
              />
              <div className="postBottomRight">
                <span> {post.comment} </span>
                <span onClick={handleShowComment} className="postCommentText"> Commentaires</span>
              </div>
            </div>
            <Comment
              post={post}
              handleComment ={handleComment}
              key = {inputReset}
            />        
            {displayComponent? 
              comments.map((comment) => (
                <CommentList
                  key={comment.id}
                  comment={comment}
                />
              )):null}
        </div>
      </div>
  );
}

export default UserPost;