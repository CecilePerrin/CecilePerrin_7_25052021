import "../styles/post.css";
import {
  PermMedia,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";
import noavatar from "../assets/noavatar.JPG"


const CreatePost = (posts) =>  {
 
  const { user } = useContext(UserContext);
  const content = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.id,
      content: content.current.value,
      imageUrl: file
    };

    if (content.current.value === "" || file === null ){
     alert("Vous ne pouvez pas envoyer un post vide")
    }else{
      const formData = new FormData();
      formData.append('userId', newPost.userId);
      formData.append('content', newPost.content);
      formData.append('imageUrl', newPost.imageUrl, newPost.imageUrl.name);
      console.log( newPost.imageUrl.name);
        await axios.post("http://localhost:4200/api/posts", formData, {
          headers:{"Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem('token')}})
            .then((res)=>{
              window.location.reload();
            })
            .catch((err)=>{
              console.log(err)
            }) 
    };
  }
   
  return (

    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.imageUrl === "0"
                ? noavatar
                :  user.imageUrl
              }
              alt="profileImageUser"
              />
            <input
              placeholder={"Quoi de neuf " + user.name + "?"}
              className="shareInput"
              ref={content}
            />
          </div>
          <hr className="shareHr" />
          {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() =>
            setFile(null)} />
          </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <PermMedia style ={{color : "#D14662"}} className="shareIcon" />
                  <span className="shareOptionText">Photo or Video</span>
                  <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
            </div>
            <button className="shareButton" type="submit">
            Share
            </button>
          </form>
      </div>
    </div>
  );
}
  export default CreatePost;

  
            