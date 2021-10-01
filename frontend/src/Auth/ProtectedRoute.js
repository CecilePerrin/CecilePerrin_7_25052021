import React from "react";
import { Route, Redirect} from "react-router-dom";
import { ValidToken } from "./ValidToken";

function ProtectedRoute({ component: Component, ...rest}){


    return (
        <Route
            {...rest} 
            render ={(props)=> {
            if (ValidToken()){
                return <Component/>;
            }else{
                return(
                    
                    <Redirect to = {{pathname:"/", state:{from: props.location} }}/>
                );
            }
            }}
        />
    );
}

export default ProtectedRoute;

