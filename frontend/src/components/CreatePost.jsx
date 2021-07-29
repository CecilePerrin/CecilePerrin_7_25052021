import "../styles/post.css";
import {
  PermMedia,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";
import PictureProfile from "../assets/helsdraw.png"

const CreatePost = () =>  {
  const { user } = useContext(UserContext);
  
  const description = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    //post axios
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
                PictureProfile
            }
            alt=""
          />
          <input
            placeholder={"Quoi de neuf " + user.firstName + "?"}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="indianRed" className="shareIcon" />
              <span className="shareOptionText">Photo ou Vidéo</span>
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
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreatePost;