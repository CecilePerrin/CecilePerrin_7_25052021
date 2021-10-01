import axios from 'axios';

export const handleUser = async () =>{
    await axios.get('http://localhost:4200/api/users', { headers: { Authorization:localStorage.getItem('token') } })
    console.log("utilisateur")
  };