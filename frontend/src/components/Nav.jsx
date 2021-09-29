import React, { useContext, useState } from "react";
import "../styles/nav.css";
import logo from '../assets/logo.png';
import { Link, Redirect } from "react-router-dom";
import noavatar from "../assets/noavatar.JPG"
import { UserContext } from "../components/UserContext.jsx";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const Nav = () => {

  const {user} = useContext(UserContext);
  const [data, setData] = useState ([])
  const [redirect, setRedirect] = useState(false)
  const [wordEntered, setWordEntered] = useState("");
  const [displayComponent, setDisplayComponent] = useState(false)

  const handleConnexion = () =>{
    localStorage.clear();
    setRedirect(true)
  }



  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    getAllUser()
  };
 

  const getAllUser = async () =>{
    if (wordEntered.length >2 ){
    await axios.get(`http://localhost:4200/api/users/allUser?search=${wordEntered}` ,{ headers: { 'Authorization':localStorage.getItem('token') } })
      .then(response=> {
        setData(response.data.users)
      })    
      .catch(err => 
        console.log(err))
    }
  }

 const showComponent=()=>{
   setDisplayComponent(!displayComponent)
 }

  const clearInput = () => {
    setWordEntered("");
  };

 
    return (
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
        <div className="container-fluid">
            <div className="topbarLeft">
              <img src={logo} alt="groupomania" className='groupomaniaLogo' />
              <span className="logo">Groupomania</span>
            </div>
            <button role ="switch" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flexNavItem" id="navbarSupportedContent" >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/Home" style={{ textDecoration: "none" }}>
                      <span className="nav-link active" aria-current="page">Home</span>
                    </Link>
                  </li>
              </ul>
              <div className="search" role ="search">
                <div className="searchInputs">
                  <input
                    aria-label="recherchez une/un collègue"
                    onClick={showComponent}
                    type="search"
                    placeholder="recherchez une/un collègue"
                    value={wordEntered}
                    onChange={handleFilter}
                  />
                  <div className="searchIcon">
                    {data.length === 0 ? (
                      <SearchIcon />
                    ) : (
                      <CloseIcon id="clearBtn" onClick={clearInput} tabindex="0"/>
                    )}
                  </div>
                </div>
                {displayComponent && data.length != 0 && (
                  <div className="dataResult" aria-expanded="false">
                    {data.slice(0, 15).map((value) => {
                      return (
                       <ul className="listSearch" >
                          <li className="flexNavItem"> 
                            <img
                              src={
                                value.imageUrl === "0"
                                ? noavatar
                                :  value.imageUrl
                              }
                              alt="Photo utilisateurs"
                              className="topbarImg"
                            />
                            <Link role="option" className="dataItem" to={`/UserWall/${value.name}`} target="_blank">
                              <p>{value.name} {value.firstName} </p>
                            </Link>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="topbarRight">
                <li class="nav-item">
                  <div className="topbarLinks">
                    <div className="dropdown me-1">
                        <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                          Mes paramètres
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                          <Link className="dropdown-item" to={`/myprofile`}>Votre compte</Link>
                          <button className="dropdown-item" onClick={handleConnexion}>Se deconnecter</button>
                        </ul>
                    </div>
                      {redirect && 
                      <Redirect to="/" />
                      }        
                  </div>
                </li>
                <li class="nav-item">
                  <Link to={`/UserWall/${user.name}`}>
                    <img
                      src={
                        user.imageUrl === "0"
                        ? noavatar
                        :  user.imageUrl
                      }
                      alt="image profile utilisateur"
                      className="topbarImg"
                    />
                  </Link>
                </li>
              </div>
            </div>
        </div>
      </nav>    
	);
};

export default Nav;
      
  


  