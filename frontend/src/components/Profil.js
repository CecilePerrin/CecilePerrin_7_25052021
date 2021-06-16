import React, { useContext } from "react";
// import { Redirect } from "react-router";
// import {Avatar} from '@material-ui/core'
// import ValidToken from "../Auth/ValidToken";
import { UserContext } from "./UserContext";

function Profil(){
    // ValidToken() ? <Profil /> : <Redirect to="/login" />
    const {user} = useContext(UserContext);
    return (
        
        <div className="container-lg">
            <pre>{JSON.stringify(user,null,2)}</pre>
      </div>
      
    );
   }


export default Profil;