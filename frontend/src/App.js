import React, {useMemo, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';


import { UserContext } from "./components/UserContext";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profil from './components/Profil';

function App() {
const [user, setUser]= useState (null);

const value = useMemo (() => ({user, setUser}), [user, setUser]);


  return (
      <Router>
        <div className="App">
        <Route exact path="/" component = {Login}/> 
        <Route exact path="/SignUp" component = {SignUp}/>
        <UserContext.Provider value={value}>
          <Route exact path="/Home" component = {Home}/>
          <Route exact path="/Profil" component= {Profil}/>
        </UserContext.Provider>
        </div>
      </Router>
  );
}

export default App;