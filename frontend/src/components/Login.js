import React from "react";
import "../styles/login.css";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Banner from './Banner'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import Warning from "./Warning";

const schema = yup.object().shape({
    firstName: yup.string().required('Veuillez entrer votre Nom'),
    email: yup.string().required('Veuillez entrer votre email').email(),
    name: yup.string().required('Veuillez entrer votre Prénom'),
    password: yup.string().required('veuillez renseigner un mot de passe').min(8)
});


const Login = () => {
    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    	});

		
	
	axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

	
    const loginUser = login =>{
		axios.post('http://localhost:4200/api/users/login', login, {
			headers: {
				Authorization: localStorage.getItem("token")
			}
		});
	}

const handleLogin = e => {
    e.preventDefault();
  	loginUser(Login)
	  .then(res => {
		localStorage.setItem("token", res.data.token);	
	})
		.catch(error => {
			Warning("danger", error.response.data.error);
		});
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
			<form onSubmit= {handleSubmit(handleLogin)}  className="login container-fluid" >
				<div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                        <input
							type="email"
							className="form-control input-login"
							name="email"
							id="validationServer02"
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
                                    id="validationServer03"
                                    placeholder="Mot de passe"
                                    autoFocus
                                />
                                <p>{errors.password?.message}</p>
                            </div>
				<h2 id="emailHelp" className="form-text" aria-hidden="true"></h2>
				<button to="/Home" type="submit" className="btn btn-primary btn-connexion">
					Se connecter
				</button>
			</form>
			</div>
			<footer >
				<p className="containerTextAccroche">Rejoignez votre team dès aujourd'hui.</p>
			</footer>
		</>
	);
};

export default Login;