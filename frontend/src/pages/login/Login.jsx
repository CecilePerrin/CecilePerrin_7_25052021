import React, { useState, useContext } from "react";
import "../../styles/login.css";
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Banner from '../../components/Banner.jsx'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { UserContext } from "../../components/UserContext.jsx";


const schema = yup.object().shape({
	email: yup.string().required('Veuillez entrer votre email').email(), 
	password: yup.string().required('Veuillez renseigner un mot de passe').min(8)
});
	
	
const Login = () => {

	const { register, handleSubmit, formState:{errors}} = useForm({
			resolver: yupResolver(schema)
	});

	const { setUser} = useContext(UserContext);	
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState({errorMessage:""})
	
	

	const loginUser = data =>{
		axios.post('http://localhost:4200/api/users/login',data,{ headers: { Authorization:localStorage.getItem('token') } })
			.then(response=> {
			setUser(response.data.user);
			localStorage.setItem('token', response.data.token)
			setRedirect(true)
			console.log("vous êtes connecté")
		})    
		.catch(err => 
			setError({ errorMessage:err.response.data.error}))
			console.log(error)
	};


	return (
		<>
			<Banner/>
			<header className="header">
				<div className="containerLink">
					<p className="textLink">Vous n'avez pas de compte?</p>
					<Link to="/SignUp" className="LinkSignUp"> S'inscrire</Link>
				</div>
				
				<hr className="divider" role="separator"></hr>
			</header>
			<main className="container row">
				<form onSubmit= {handleSubmit(loginUser)}  className="login container-fluid" >
					<h1 className="title-form" >Se connecter</h1>
					<div className="form-group" role="group">
						<label htmlFor="email" className="form-label">Email</label>
							<input
								type="email"
								aria-label="Écrire votre email"
								className="form-control input-login"
								name="email"
								{...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
								placeholder="robert.87@gmail.com"
								autoFocus
							/>
						<p style= {{color:"red"}} >{errors.email?.message}</p>
					</div>
					<div className="form-group" role="group">
						<label htmlFor="password">Mot de passe</label>
						<input
							type="password"
							aria-label="Écrire votre mot de passe"
							className="form-control input-login "
							name="password"
							{...register("password", { pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/ })}
							placeholder="Mot de passe"
							autoFocus
						/>
						<p style= {{color:"red"}} >{errors.password?.message}</p>
					</div>
					<button type="submit" className="btn btn-primary btn-connexion" aria-label="Se connecter">
						Se connecter
					</button>
					{error.errorMessage !== ""?(	
						<div aria-hidden="true"  className="alert alert-warning alert-dismissible " role="alert">
							{error.errorMessage}
						</div>
						
					):null}
					{redirect && <Redirect to="/home" />}
				</form>
			</main>
						
		</>
	);
};

export default Login;