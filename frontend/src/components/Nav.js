import React from "react";
import "../styles/nav.css";
import logo from '../assets/logo.png';


const Nav = () => {
    return (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <img src={logo} alt="groupomania" className='logo' />
            <a className="navbar-brand title_home" href="http://localhost:3000/home">GROUPOMANIA</a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="http://localhost:3000/home">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/home">Link</a>
                    </li>
                </ul>
                
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-primary btn-connexion" type="submit">Search</button>
                </form>
            </div>
        </div>
        <div className="d-flex">
            <div className="dropdown me-1">
                <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                Offset
                </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                    <li><a className="dropdown-item" href="http://localhost:3000/home">Voir Profil</a></li>
                    <li><a className="dropdown-item" href="http://localhost:3000/home">Se deconnecter</a></li>
                    </ul>
            </div>    
        </div>
    </nav>
		
	);
};



export default Nav;