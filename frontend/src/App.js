import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';


import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

function App() {
  return (
      <Router>
        <div className="App">
        <Route exact path="/" component = {Login}/> 
        <Route exact path="/SignUp" component = {SignUp}/>
        <Route exact path="/Home" component = {Home}/>
        </div>
      </Router>
  );
}

export default App;
