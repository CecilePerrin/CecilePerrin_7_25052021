import React, { useState } from "react";
import "../styles/nav.css";
import logo from '../assets/logo.png';
import { Search} from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import PictureProfile from "../assets/helsdraw.png"



const Nav = () => {
    const [redirect, setRedirect] = useState(false)
    const handleConnexion = () =>{
        localStorage.clear();
        setRedirect(true)

    }
    return (

	<div className="topbarContainer">
      <div className="topbarLeft">
        <img src={logo} alt="groupomania" className='groupomaniaLogo' />
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <span className="logo">Groupomania</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="dropdown me-1">
            <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
            Mes paramètres
            </button>
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                 <li><a className="dropdown-item" href="http://localhost:3000/myprofile">Voir Profil</a></li>
                 <li><a className="dropdown-item" onClick={handleConnexion}>Se deconnecter</a></li>
                 </ul>
             </div>
             {redirect && <Redirect to="/" />}        
        </div>
       
        <Link to={"/UserWall"}>
          <img
            src={PictureProfile}
            alt=""
            className="topbarImg"
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>	
	);
};



export default Nav;