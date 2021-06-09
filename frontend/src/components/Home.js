import React from "react";
import "../styles/home.css";
import Nav from './Nav'
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import imgPost from '../assets/helsdraw.png'


const Home = () => {
    return (
        <div>
            <Nav />
            <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={imgPost} className ="img-thumbnail"alt="..." />
                            </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};



export default Home;