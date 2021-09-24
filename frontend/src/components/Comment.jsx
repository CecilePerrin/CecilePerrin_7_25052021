import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "./UserContext";
import SendIcon from '@material-ui/icons/Send';
import "./../styles/comment.css"

const Comment = ({post, handleComment}) => {
	
	const { user } = useContext(UserContext);

    const [content, setContent] = useState(null)

    const commentText = {
        content: content,
        userId: user.id
    }
    
    const handleSendComm = async (e) =>{
      
        await axios.post(`http://localhost:4200/api/posts/${post.id}/comments`,commentText, { headers: { 'Authorization':localStorage.getItem('token') } })
        .then(response=> {	
            handleComment()
			console.log(response)
            setContent(null)
                       
		})    
        .catch(err => 
			console.log(err)
    )}


	return (
		<>
			<div className="shareComment">
                <img
                    className="userImageComment"
                    src={
                    user.imageUrl == "0"
                    ? noavatar
                    :  user.imageUrl
                    }
                    alt=""
                    />
                <input
                    type="text"
                    placeholder={"Ecrivez un commentaire..."}
                    className="shareCommentInput"
                    onChange={e=>setContent(e.target.value)}
                    aria-label="comments"
                    name="comments"
                />
                <SendIcon style = {{cursor:"pointer"}}  onClick ={handleSendComm}/>
          </div>
		</>
	);
};
export default Comment;