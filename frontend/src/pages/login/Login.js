import React, { useState, useContext } from "react";
import "../../styles/login.css";
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Banner from '../../components/Banner'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { UserContext } from "../../components/UserContext";
// import Warning from "./Warning";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// const schema = yup.object().shape({
// 	    firstName: yup
// 		.string()
// 		.required('Veuillez entrer votre Nom'),
// 	    email: yup
// 		.string()
// 		.required('Veuillez entrer votre email')
// 		.email('Veuillza rentrer un email valide'),
// 	    name: yup
// 		.string()
// 		.required('Veuillez entrer votre Prénom'),
// 	    password: yup
// 		.string()
// 		.required('veuillez renseigner un mot de passe')
// 		.matches(PASSWORD_REGEX, "veuillez rentrer un mot de passe plus fort")
// 		.min(8, "votre mot de passe doit faire plus de 8 caractères")
// 	});

	const schema = yup.object().shape({
		email: yup.string().required('Veuillez entrer votre email').email(), 
		password: yup.string().required('veuillez renseigner un mot de passe').min(8)
	});
	
	
	const Login = () => {
		const { register, handleSubmit, formState:{errors}} = useForm({
			resolver: yupResolver(schema)
    	});
	const { setUser, alert} = useContext(UserContext);	

	const [redirect, setRedirect] = useState(false);
	

    const loginUser = data =>{

        axios.post('http://localhost:4200/api/users/login',data,{ headers: { Authorization:localStorage.getItem('token') } })
        .then(response=> {
			setUser(response.data.user);
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))
			setRedirect(true)
			console.log("vous êtes connecté")
			console.log(response.data.user)
		})    
        .catch(error => console.log(error));
};


	return (
		<>
		<Banner/>
		<div className="header">
			<div className="containerLink">
							<p className="textLink">Vous n'avez pas de compte?</p>
							<Link to="/SignUp" className="LinkSignUp"> S'inscrire</Link>
			</div>
			
			<hr className="divider"></hr>
		</div>
		<div className="container row">
			<form onSubmit= {handleSubmit(loginUser)}  className="login container-fluid" >
				<div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                        <input
							type="email"
							className="form-control input-login"
							name="email"
							aria-describedby="emailHelp"
							{...register("email", { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
							placeholder="robert.87@gmail.com"
							autoFocus/>
                    <p>{errors.email?.message}</p>
                </div>
				<div className="form-group">
                                <label htmlFor="exampleInputPassword">Mot de passe</label>
                                <input
                                    type="password"
                                    className="form-control input-login "
                                    name="password"
                                    {...register("password", { pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/ })}
                                    placeholder="Mot de passe"
                                    autoFocus
                                />
                                <p>{errors.password?.message}</p>
                </div>
				<h2 id="emailHelp" className="form-text" aria-hidden="true"></h2>
				<button type="submit" className="btn btn-primary btn-connexion">
					Se connecter
				</button>
			</form>
			{redirect && <Redirect to="/myprofile" />}
			</div>
			<footer >
				<p className="containerTextAccroche">Rejoignez votre team dès aujourd'hui.</p>
			</footer>
		</>
	);
};

export default Login;