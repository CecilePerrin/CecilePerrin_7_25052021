
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

const UserPost = ({post}) => {

  const {user} = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const date = new Date(post.createdAt).toLocaleString();
  const [comments, setComments] = useState(null);
  const [displayComponent, setDisplayComponent] = useState(false)
  const [inputReset, setInputReset] = useState(0)
  const [displayModify, setDisplayModify] = useState(false)



  const content = useRef();
  // const [newFile, setNewFile] = useState(null)

  // const handleUpdate = async (e, id) => {
  //   e.preventDefault();
  //   const modifyPost = {
  //     userId: user.id,
  //     content: content.current.value,
  //     imageUrl: newFile
  //   };

  //   const formData = new FormData();
  //   formData.append('userId', modifyPost.userId);
  //   formData.append('content', modifyPost.content);
  //   formData.append('imageUrl', modifyPost.imageUrl, modifyPost.imageUrl.name);
  //   console.log( modifyPost.imageUrl.name);
  //   try {
  //     await axios.put(`http://localhost:4200/api/posts/${id}`, formData, {
  //       headers:{"Content-Type": "multipart/form-data",
  //       Authorization: localStorage.getItem('token')
  //     }     
  //     });
  //     setDisplayModify(false)
  //   } catch (err) {}
  
   
  // }



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
                    <div class="btn-group dropstart">
                      <MoreVert 
                        type="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        id="dropdownMenuOffset" 
                        data-toggle="dropdown" 
                        style={{ fontSize: "2rem" }}
                      />  
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" onClick={handleShowModify}>Modifier la publication</a></li>
                        <li><a class="dropdown-item"  onClick={() => handleDeletePost(post.id)} >Supprimer la publication</a></li>                      
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
                <span> {post.Comments.length} </span>
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
                  post={post}
                />
              )):null}
        </div>
        {displayModify? 
        <ModifyPost
          key={post.id}
          post={post}
          // newFile={newFile}
          // setNewFile={setNewFile}
          handleShowModify={handleShowModify}
          // handleUpdate={handleUpdate}
          content={content}
          date={date}
        />
        :null}
      </div>
      
  );
}

export default UserPost;