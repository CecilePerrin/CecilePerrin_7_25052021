import React, { useContext, useState } from "react";
import "../styles/nav.css";
import logo from '../assets/logo.png';
import { Link, Redirect } from "react-router-dom";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";


const Nav = () => {
   const {user} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false)
    const handleConnexion = () =>{
        localStorage.clear();
        setRedirect(true)

    }
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div className="topbarLeft">
              <img src={logo} alt="groupomania" className='groupomaniaLogo' />
              <span className="logo">Groupomania</span>
            </div>
            <button class="navbar-toggler dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link to="/Home" style={{ textDecoration: "none" }}>
                    <span class="nav-link active" aria-current="page" href="#">Home</span>
                    </Link>
                  </li>
              </ul>
              <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button class="btn btn-search " type="submit">Search</button>
              </form>
              <div className="topbarRight">
                  <div className="topbarLinks">
                    <div className="dropdown me-1">
                        <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                        Mes paramètres
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                          <li><a className="dropdown-item" href="http://localhost:3000/myprofile">Votre compte</a></li>
                          <li><a className="dropdown-item" onClick={handleConnexion}>Se deconnecter</a></li>
                        </ul>
                    </div>
                    {redirect && 
                    <Redirect to="/" />
                    }        
                  </div>
                  <Link to={"/UserWall"}>
                  <img
                    src={
                    user.imageUrl
                    ? user.imageUrl
                    :  noavatar}
                    alt=""
                    className="topbarImg"
                    />
                  </Link>
              </div>
            </div>
        </div>
      </nav>    
	);
};

export default Nav;
      
  


  