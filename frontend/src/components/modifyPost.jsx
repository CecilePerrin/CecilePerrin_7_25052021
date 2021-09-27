
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import "../styles/userPost.css"
import {Cancel, PermMedia} from"@material-ui/icons"


const ModifyPost = ({post, handleShowModify, content, date,}) => {

  const [newFile, setNewFile] = useState(null)
  const {user} = useContext(UserContext);


  const handleUpdate = async (e) => {
    e.preventDefault();

    const modifyPost = {
      userId: user.id,
      content: content.current.value,
      imageUrl: newFile
    };
    
    const id = post.id
    
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
      window.location.reload();
    } catch (err) {}
  }
 

return (
  <div className ="cover">
    <div className="post modifyPost">
      <div className="postWrapper">
        <div className="headerModify">
            <span className="headerTextModify" >Modifier la publication</span>
            <Cancel onClick={handleShowModify} />
            <hr className="shareHr" />
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
            className="postText shareInput"
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
        <form className="shareBottom" onSubmit={(id)=>handleUpdate(id)}>
            <div className="">
                <label htmlFor="modifyFile" className="shareOption">
                  <PermMedia style ={{color : "#D14662"}} className="shareIcon" />
                  <span className="shareOptionText">Photo or Video</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="modifyFile"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) =>  setNewFile(e.target.files[0])}
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


        