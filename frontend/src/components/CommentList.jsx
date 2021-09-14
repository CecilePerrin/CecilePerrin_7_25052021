import React, { useContext, useRef } from "react";
import noavatar from "../assets/noavatar.JPG"
import "./../styles/comment.css"


const CommentList = ({comment}) =>{

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
            </div>
        </>
    )

}

export default CommentList