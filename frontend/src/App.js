import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from "axios"
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
// import ProtectedRoute from './Auth/ProtectedRoute';
import Profile from './pages/profile/Profile';
import jwt_decode from "jwt-decode";
import { UserContext } from "./components/UserContext";


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
 
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
  })



  useEffect(() => {
		if (user.id == "" && ValidToken()) {
      axios.get('http://localhost:4200/api/users', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      })

		}
	}, [user]);

  
  
 
   
  return (
      <Router>
          <div className="App">
            <UserContext.Provider value={{user, setUser, ValidToken}} >
                <Route exact path="/" component = {Login}/> 
                <Route exact path="/SignUp" component = {SignUp}/>
                <Route exact path="/Home" component = {Home}/>
                <Route exact path= "/myprofile" component={Profile} />
            </UserContext.Provider>
          </div>
      </Router>
  );
}

export default App;