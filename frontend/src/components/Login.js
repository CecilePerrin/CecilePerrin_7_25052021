import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";


const Login = () => {

	return (
		<>
		<div className="header">
			<div className="containerLink">
							<p className="textLink">Vous n'avez pas de compte?</p>
							<Link to="/SignUp" className="LinkSignUp"> S'inscrire</Link>
			</div>
			
			<hr className="divider"></hr>
		</div>
		<div className="container row">
			<form className="login container-fluid" >
				<div className="form-group">
					<h2 className="title-form" >Se connecter à Groupomania</h2>
					<label htmlFor="email" class="form-label">Email</label>
					<input
						type="email"
						className="form-control input-login is-valid"
						name="email"
						id="validationServer01"
						
						aria-describedby="emailHelp"
						placeholder="robert.87@gmail.com"
						autoFocus
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Mot de passe</label>
					<input
						type="password"
						className="form-control input-login is-valid"
						name="password"
						id="validationServer02"
						
						placeholder="Mot de passe"
						autoFocus
					/>
				</div>{" "}
				<h2 id="emailHelp" className="form-text" aria-hidden="true"></h2>
				<button type="submit" className="btn btn-primary btn-connexion">
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