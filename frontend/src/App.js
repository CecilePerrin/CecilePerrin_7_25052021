import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Banner from './components/Banner'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
      <Router>
        <div className="App">
        <Banner/>
        <Route exact path="/Login" component = {Login}/>
      
        <Route exact path="/SignUp" exact component = {SignUp}/>

        </div>
      </Router>
  );
}

export default App;
