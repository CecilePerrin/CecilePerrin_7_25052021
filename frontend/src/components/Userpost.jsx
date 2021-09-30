
import { MoreVert } from "@material-ui/icons";
import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import "../styles/userPost.css"
import Likes from "./Likes";
import Comment from "./Comment";
import CommentList from "./CommentList"
import ModifyPost from "./modifyPost";


const UserPost = ({post, posts, setPosts, handlePosts}) => {
   
  const {user} = useContext(UserContext);
  const date = new Date(post.createdAt).toLocaleString();
  const [comments, setComments] = useState(0);
  const [displayComponent, setDisplayComponent] = useState(false)
  const [inputReset, setInputReset] = useState(0)
  const [displayModify, setDisplayModify] = useState(false)
  const content = useRef();
 

const handleDeletePost = async (id) => {
  const answer = window.confirm("êtes vous sûr?");
  if (answer) {
    await axios.delete(`http://localhost:4200/api/posts/${id}`,{ headers: { 'Authorization':localStorage.getItem('token') } })
      .then((response) => {
        const data = posts.filter((post) => post.id !== id);
        setPosts(data);
      })
      .catch(error => console.log(error));
      }
  };


  const handleComment = async () =>{
    await axios.get(`http://localhost:4200/api/posts/${post.id}/comments`, { headers: { Authorization:localStorage.getItem('token') },
    })
      .then((response) => {
        setComments(response.data.comments);
        console.log(response.data.comments)
        setInputReset(inputReset +1)  
      })
      .catch(error => {
        console.log(error)
      })
  };


  useEffect(() => {
    if (!comments) {
      handleComment();
    }
  });


  const handleShowComponent = () =>{
      setDisplayComponent(!displayComponent)
    
  }

  const handleShowModify = () =>{
    setDisplayModify(!displayModify)
  }
    

  return (
      <div className="post">
        <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/UserWall/${post.User.name}`}>
                  <img
                    className="postProfileImg"
                    src={ post.User.imageUrl === "0"
                    ? noavatar
                    :  post.User.imageUrl
                      }
                    alt="profile image utilisateur"
                  />
                </Link>
                <span className="postUsername">{post.User.name} {post.User.firstName}</span>
                <p className="card-text"><small className="text-muted">{date}</small></p>
              </div>
              <div className="postTopRight">
                  {user.id === post.User.id || user.admin === true ? (
                    <div class="btn-group dropstart" >
                      <MoreVert 
                        type="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        id="dropdownMenuOffset" 
                        data-toggle="dropdown" 
                        style={{ fontSize: "2rem" }}
                        tabindex="0"
                      />  
                      <ul class="dropdown-menu">
                        <li role="option"><button class="dropdown-item"  onClick={handleShowModify}>Modifier la publication</button></li>
                        <li role="option"><button class="dropdown-item"  onClick={() => handleDeletePost(post.id)} >Supprimer la publication</button></li>                      
                      </ul>
                    </div>
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
                <span> {comments.length} </span>
                <span onClick={handleShowComponent} className="postCommentText"> Commentaires</span>
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
                  comments={comments}
                  handleComment={handleComment}
                  setComments={setComments}
                  post={post}
                />
              )):null}
        </div>
        {displayModify? 
        <ModifyPost
          key={post.id}
          post={post}
          handlePosts={handlePosts}
          handleShowModify={handleShowModify}
          content={content}
          date={date}
        />
        :null}
      </div>   
  );
}

export default UserPost;