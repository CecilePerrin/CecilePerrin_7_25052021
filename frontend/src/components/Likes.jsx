import axios from "axios";
import { UserContext } from "../components/UserContext.jsx";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState, useContext, useEffect } from "react";


const Likes = ({post}) =>{
 
    const {user} = useContext(UserContext);
    
    const [likes, setLikes] = useState(0)
    
    const [isLiked, setIsLiked]=useState(false)


  const getLike = async ()=>{

    await axios.get(`http://localhost:4200/api/posts/${post.id}/likes`, { headers: { Authorization:localStorage.getItem('token') } })
    .then((response) => {
      setLikes(response.data.likes);
      
    })
    .catch(error => console.log(error));
  }


  useEffect (()=>{
    if(!likes){
      getLike()
    }
  })

  const handleLikes =  (e) =>{

    e.preventDefault();
    const userId = user.id
      axios.post(`http://localhost:4200/api/posts/${post.id}/likes`,userId, { headers: { 'Authorization':localStorage.getItem('token') } })
    .then((response) => {
      getLike()
      setIsLiked(response.data.like);
      console.log(response.data.like)
      
    })
    .catch(error => console.log(error));
  }


  useEffect(()=>{
    if(post.Likes.includes(user.id)){
      setIsLiked(true)
    }
  },[])


    
    return(
        <div className="postBottomLeft">
          <FavoriteIcon onClick ={handleLikes} type="button" className="likeIcon" className={isLiked? 'red': 'grey'}/>   
          <span className="postLikeCounter">{likes.length} j'aime</span>
        </div>
    )
}


export default Likes;

