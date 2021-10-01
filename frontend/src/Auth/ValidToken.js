import jwt_decode from "jwt-decode";

export const ValidToken = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      const decodedToken = jwt_decode(token, {complet:true});
      console.log (decodedToken)
      const dateNow = new Date();
      if (decodedToken.exp > dateNow / 1000) {
        return true;
      } else {
        window.location = "/";
      }
    }
  };