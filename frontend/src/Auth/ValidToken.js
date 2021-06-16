import jwt from "jwt-decode";

const ValidToken = () =>{

    var isExpired = false;
    const token = localStorage.getItem('token');
    var decodedToken = jwt.decode(token, {complete: true});
    var dateNow = new Date();
    
    if(decodedToken.exp < dateNow.getTime())
       isExpired = true;
}


export default ValidToken;