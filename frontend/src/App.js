import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from "axios"
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx';

import { UserContext } from "./components/UserContext.jsx";
import UserWall from './pages/userWall/UserWall';
import ProtectedRoute from './Auth/ProtectedRoute';
import { ValidToken } from './Auth/ValidToken';


const App = () => {

  const [user, setUser] = useState({
    id: "",
    firstName:"",
    name: "",
    email: "",
    imageUrl:"",
    admin:"",
  })
  
 

  const handleUser = async () =>{
    await axios.get('http://localhost:4200/api/users', { headers: { Authorization:localStorage.getItem('token') } })
    .then((response) => {
      setUser(response.data.user);
    })
    .catch(error => {
      console.log(error.message)
    });
  }


  useEffect(() => {
  	if ((!user ||user.id === "")&& ValidToken()) {  
	  handleUser();
	  } 
	},[user]);


  return (
      <Router>
          <div className="App ">
            <UserContext.Provider value={{user, setUser,}} >
                <Route exact path="/" component = {Login} />
                <Route exact path="/SignUp" component = {SignUp}/>
                <ProtectedRoute exact path="/Home" component = {Home} />
                <ProtectedRoute exact path ="/myprofile" component={Profile} handleUser={handleUser}  /> 
                <ProtectedRoute exact path="/UserWall/:name" component ={UserWall}  />
            </UserContext.Provider>
          </div>
      </Router>
  );
}

export default App;

