import React, { useContext, useState } from "react";
import "../styles/nav.css";
import logo from '../assets/logo.png';
import { Link, Redirect } from "react-router-dom";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const Nav = () => {
   const {user} = useContext(UserContext);
   
  const [redirect, setRedirect] = useState(false)

  const handleConnexion = () =>{
    localStorage.clear();
    setRedirect(true)
  }

  
 
    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="topbarLeft">
              <img src={logo} alt="groupomania" className='groupomaniaLogo' />
              <span className="logo">Groupomania</span>
            </div>
            <button className="navbar-toggler dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/Home" style={{ textDecoration: "none" }}>
                    <a class="nav-link active" aria-current="page" >Home</a>
                    </Link>
                  </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              </form>
              <div className="topbarRight">
                  <div className="topbarLinks">
                    <div className="dropdown me-1">
                    <NotificationsNoneIcon  style ={{color: "#D14662", fontSize:"2rem"} }/>
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
                        user.imageUrl == "0"
                        ? noavatar
                        :  user.imageUrl
                      }
                  
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
      
  


  