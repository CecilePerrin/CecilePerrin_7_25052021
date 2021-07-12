import React, { useContext }  from "react";
import {Avatar} from '@material-ui/core'
import '../../styles/post.css'
import Nav from '../../components/Nav'
// import Post from './post'
// import { Link } from "react-router-dom";
import imgPost from '../../assets/helsdraw.png'
import { UserContext } from "../../components/UserContext";

const Home = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <Nav /> 
                <div className="card">
                <div className="profile-picture">
                </div>
                    <div className="card-header">
                        <Avatar user={user} src="/broken-image.jpg" />
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label invisible"></label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <button classNameName="btn btn-primary">Submit</button>
                    </div>
                </div>                      
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    <img src={imgPost} classNameName ="img-thumbnail"alt="..." />                   
                    <div className="card-header">
                            <Avatar src="/broken-image.jpg" />
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" className="form-label invisible"></label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                    </div>
                </div>
               
            </div>
            
    )
};



export default Home;