import React, { useContext }  from "react";
import {Avatar} from '@material-ui/core'
import '../../styles/post.css'
import Nav from '../../components/Nav.jsx'
import CreatePost from '../../components/CreatePost.jsx';
import UserPost from "../../components/Userpost.jsx";
// import { Link } from "react-router-dom";
import imgPost from '../../assets/helsdraw.png'
import { UserContext } from "../../components/UserContext.jsx";

const Home = () => {
    const {user} = useContext(UserContext);
    return (
        <>
            <Nav /> 
            <div className = "container-sm">
                <CreatePost />
                <UserPost />             
               
            </div>
         </>   
    )
};



export default Home;