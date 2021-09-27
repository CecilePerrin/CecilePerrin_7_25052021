import React, { useContext, useState } from "react";
import SendIcon from '@material-ui/icons/Send';
import noavatar from "../assets/noavatar.JPG"
import "./../styles/comment.css"
import { UserContext } from "./UserContext";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from "axios";

const CommentList = ({comment, post, comments, setComments, handleComment}) =>{

    const {user} = useContext(UserContext)
    const [displayModifyComm, setDisplayModifyComm]= useState(false)
    const [newContent, setNewContent] = useState(null)

    const handleDeleteComment = async (id)=>{
        const answer = window.confirm("êtes vous sûr?");
        if (answer) {
        await axios.delete(`http://localhost:4200/api/posts/${post.id}/comments/${comment.id}`,{ headers: { 'Authorization':localStorage.getItem('token') } })
        .then((response) => {
          const data = comments.filter((comment) => comment.id !== id);
          setComments(data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
        }
    }
    
    const showModifyComm =()=>{
      setDisplayModifyComm(true)
      console.log(displayModifyComm)
    }
    
    const commentText = {
      content: newContent,
      userId: user.id
  }

    const handleModifyComm = async (e) =>{
      await axios.put(`http://localhost:4200/api/posts/${post.id}/comments/${comment.id}`,commentText, { headers: { 'Authorization':localStorage.getItem('token') } })
      .then(() =>{	
          setDisplayModifyComm(false)             
          handleComment()
  })    
      .catch(err => 
    console.log(err)
  )}

    return (
        <>
            <div className="shareCommentList">
                <img
                    className="userImageComment"
                    src={
                    comment.User.imageUrl === "0"
                    ? noavatar
                     : comment.User.imageUrl
                    }
                    alt=""
                    />   
                {displayModifyComm?   
                <div class="btn-group dropstart">
                  <input
                      type="text"
                      placeholder={comment.content}
                      className="shareCommentInput"
                      onChange={e=>setNewContent(e.target.value)}
                      aria-label="comments"
                      name="comments"
                  />
                  <SendIcon onClick ={handleModifyComm}/>
                  </div>
                  : <div className="commentList">
                      <div className="commentUsername" >{comment.User.name} {comment.User.firstName}</div>
                      <div>{comment.content}</div>
                    </div>
                }
                 {(user.id === comment.User.id || user.admin === true) && (displayModifyComm === false) ? (
                    <div class="btn-group dropstart">
                      <MoreHorizIcon 
                        // class="opacityModifyComment"
                        type="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        id="dropdownMenuOffset" 
                        data-toggle="dropdown" 
                        style={{ fontSize: "1rem" }}
                      />  
                      <ul class="dropdown-menu">
                        <li><button class="dropdown-item" onClick={showModifyComm}>Modifier</button></li>
                        <li><button class="dropdown-item" onClick={() => handleDeleteComment(comment.id)} >Supprimer</button></li>                      
                      </ul>
                    </div>
                  ) : null}
            </div>
        </>
    )

}

export default CommentList

