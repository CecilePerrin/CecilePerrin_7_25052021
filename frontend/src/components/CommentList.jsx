import React, { useContext, useRef, useState } from "react";
import noavatar from "../assets/noavatar.JPG"
import "./../styles/comment.css"
import { UserContext } from "./UserContext";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from "axios";

const CommentList = ({comment, post}) =>{
    const {user} = useContext(UserContext)
    const [comments, setComments] = useState() 


    const handleDeleteComment = async (id)=>{
        const answer = window.confirm("êtes vous sûr?");
        if (answer) {
        await axios.delete(`http://localhost:4200/api/posts/${post.id}/comment`,{ headers: { 'Authorization':localStorage.getItem('token') } })
        .then((response) => {
          const data = comments.filter((comment) => comment.id !== id);
          setComments(data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
        }
    }
  
    
    return (
        <>
            <div className="shareCommentList">
                <img
                    className="userImageComment"
                    src={
                    !comment.User.imageUrl
                    ? comment.User.imageUrl
                     : noavatar
                    }
                    alt=""
                    />
                <span
                className="shareCommentInput"
                >{comment.content}</span>
                 {user.id === comment.User.id ? (
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
                        <li><a class="dropdown-item">Modifier</a></li>
                        <li><a class="dropdown-item"  onClick={() => handleDeleteComment(comment.id)} >Supprimer</a></li>                      
                      </ul>
                    </div>
                  ) : null}
            </div>
        </>
    )

}

export default CommentList

