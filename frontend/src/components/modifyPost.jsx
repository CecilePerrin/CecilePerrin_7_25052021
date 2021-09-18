
import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import "../styles/userPost.css"
import {Cancel, PermMedia} from"@material-ui/icons"


const ModifyPost = 
({post, 
  handleShowModify, 
  content,
  date
}) => {
  const [newFile, setNewFile] = useState(null)
  const {user} = useContext(UserContext);

   const handleUpdate = async (e, id) => {
    e.preventDefault();
    const modifyPost = {
      userId: user.id,
      content: content.current.value,
      imageUrl: newFile
    };

    const formData = new FormData();
    formData.append('userId', modifyPost.userId);
    formData.append('content', modifyPost.content);
    formData.append('imageUrl', modifyPost.imageUrl, modifyPost.imageUrl.name);
    console.log( modifyPost.imageUrl.name);
    try {
      await axios.put(`http://localhost:4200/api/posts/${id}`, formData, {
        headers:{"Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem('token')
      }     
      });
      // setDisplayModify(false)
    } catch (err) {}
  
   
  }
  console.log(URL.createObjectURL(newFile))
 
return (
  <div className ="cover">
    <div className="post modifyPost">
      <div className="postWrapper">
        <div>
            <span>Modifier la publication</span>
            <Cancel onClick={handleShowModify} />
        </div>
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
        </div>
        <div className="postCenter">
          <input
            placeholder={post.content}
            className="postText"
            ref={content}
          /> 
          
              <div className="shareImgContainer">
                <img className="shareImg" 
                src={
                  newFile?
                  URL.createObjectURL(newFile)
                 :post.imgUrl}
                alt=""
                />
                <Cancel 
                    className="shareCancelImg" 
                    onClick={() =>setNewFile(null)} 
                />
              </div>
        
        
        </div>
        <form className="shareBottom" onSubmit={handleUpdate}>
            <div className="">
                <label htmlFor="file" className="shareOption">
                  <PermMedia style ={{color : "#D14662"}} className="shareIcon" />
                  <span className="shareOptionText">Photo or Video</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="newFile"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setNewFile(e.target.files[0])}
                  />
                </label>
            </div>
            <button className="shareButton"  type="submit">
             Modifier
            </button>
        </form>              
      </div>
    </div>
  </div>
    
  );
}

export default ModifyPost;