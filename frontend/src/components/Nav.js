import React from "react";
import "../styles/nav.css";
// import { UserContext } from "../components/UserContext";
import logo from '../assets/logo.png';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import PictureProfile from "../assets/helsdraw.png"



const Nav = () => {
    // const { user, setUser} = useContext(UserContext);
    return (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <img src={logo} alt="groupomania" className='logo' />
            <a className="navbar-brand title_home" href="http://localhost:3000/home">GROUPOMANIA</a>
                <form className="d-flex">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                    />
                </div>
                </form>
            <div className="dropdown me-1">
            <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
            Offset
            </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                <li><a className="dropdown-item" href="http://localhost:3000/profile">Voir Profil</a></li>
                <li><a className="dropdown-item" href="http://localhost:3000/">Se deconnecter</a></li>
                </ul>
            </div>        
        </div>
    
        <div className="d-flex">
        <Link to={"/myprofile"}>
          <img
            src={PictureProfile}
            alt=""
            className="topbarImg"
          />    
        </Link>
        </div>
    </nav>
		
	);
};



export default Nav;