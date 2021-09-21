import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from "axios"
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx';
import jwt_decode from "jwt-decode";
import { UserContext } from "./components/UserContext.jsx";
import UserWall from './pages/userWall/UserWall';


const ValidToken = () => {
  if (localStorage.getItem('token')) {
    const decodedToken = jwt_decode(localStorage.getItem('token'));
    const dateNow = new Date();
    if (decodedToken.exp > dateNow / 1000) {
      return true;
    } else {
			localStorage.clear();
			window.location = "/";
		}
  }
};


const App = () => {
  
  const [user, setUser] = useState({
    id: "",
    firstName:"",
    name: "",
    email: "",
    imageUrl:"",
  })



  // useEffect(() => {
	// 	if (user.id === "" && ValidToken()) {
  //     axios.get('http://localhost:4200/api/users', {
  //       headers: {
  //         'Authorization': localStorage.getItem('token')
  //       }
  //     })
  //     .then((res) => {
  //       setUser(res.data.user);
  //       console.log(res.data)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
	// 	}
	// }, [user]);

  const handleUser = async () =>{
    await axios.get('http://localhost:4200/api/users', { headers: { Authorization:localStorage.getItem('token') } })
    .then((response) => {
      setUser(response.data.user);
    })
    .catch(error => console.log(error));
  }


  useEffect(() => {
		if (!user ||user.id === "" && ValidToken()) {
			handleUser();
		}
	});
   
  return (
      <Router>
          <div className="App">
            <UserContext.Provider value={{user, setUser, ValidToken}} >
                <Route exact path="/" component = {Login}/> 
                <Route exact path="/SignUp" component = {SignUp}/>
                <Route exact path="/Home" component = {Home}/>
                <Route exact path= "/myprofile" component={Profile} handleUser={handleUser} />
                <Route exact path="/UserWall/:name" component ={UserWall} />
            </UserContext.Provider>
          </div>
      </Router>
  );
}

export default App;

