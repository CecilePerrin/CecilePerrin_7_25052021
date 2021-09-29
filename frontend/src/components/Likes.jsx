import axios from "axios";
import { UserContext } from "../components/UserContext.jsx";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState, useContext, useEffect } from "react";


const Likes = ({post}) =>{
 
  const {user} = useContext(UserContext);  
  const [likes, setLikes] = useState(0)  
  const [isLiked, setIsLiked]=useState(false)
  const userId = user.id
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source()

  const getLike = async ()=>{
    await axios.get(`http://localhost:4200/api/posts/${post.id}/likes`, { headers: { Authorization:localStorage.getItem('token') }, 
      cancelToken:source.token })
    .then((response) => {
      setLikes(response.data.likes);
      
    })
    .catch(error => {
      if (axios.isCancel(error)){
        console.log('Request canceled', error.message)
      }else{
        console.log(error)
      }
    });
  }
  
  
  const getUserLike = async (id)=>{
    await axios.get(`http://localhost:4200/api/posts/${post.id}/likes/${userId}`, { headers: { Authorization:localStorage.getItem('token') },
     cancelToken:source.token})
    .then((response) => {
      setIsLiked(response.data.like);
    })
    .catch(error => {
      if (axios.isCancel(error)){
        console.log('Request canceled', error.message)
      }else{
        console.log(error)
      }
    });
   
  }

  useEffect (()=>{
      getLike()
      return () =>{source.cancel()} 
  },[])

  useEffect (()=>{
    getUserLike()
    return () =>{source.cancel()} 
},[likes])


  const handleLikes =  (e) =>{
    e.preventDefault();
      axios.post(`http://localhost:4200/api/posts/${post.id}/likes`,userId, { headers: { 'Authorization':localStorage.getItem('token') } })
    .then((response) => {
      getLike() 
    })
    .catch(error => console.log(error));
  }

  
    return(  
        <div className="postBottomLeft">
          <FavoriteIcon onClick ={handleLikes} type="button" className={isLiked? 'red': 'grey'}/>   
          <span className="postLikeCounter">{likes.length} j'aime</span>
        </div>
    )
    
}


export default Likes;

