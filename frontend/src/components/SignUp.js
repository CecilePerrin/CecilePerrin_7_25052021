import React, { useState } from "react";
import {appendErrors, useForm} from 'react-hook-form';
import Banner from './Banner'
import Axios from 'axios'
import "../styles/login.css";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

const schema = yup.object().shape({
    firstName: yup.string().required('Veuillez entrer votre Nom'),
    email: yup.string().required('Veuillez entrer votre email').email(),
    name: yup.string().required('Veuillez entrer votre Prénom'),
    password: yup.string().required('veuillez renseigner un mot de passe').min(8)
});


const SignUp = () => {
    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });
   
 
    const onSubmit = data =>{
        Axios.post('http://localhost:4200/api/users/signup',
        data).then((response)=>{
            console.log(response);
        })
}

    return (
        <>
        <Banner/>
        <div  className="header">
            <div className="containerLink">
                                <p className="textLink">Vous n'avez pas de compte?</p>
                                <Link to="/" className="LinkSignUp"> Se connecter</Link>
            </div>
        </div>
            <div className="container row">
                        <form  onSubmit= {handleSubmit(onSubmit)} className="login container-fluid" >
                            <h2 className="title-form" >S'inscire à Groupomania</h2>
                            <div className="form-group">
                                <label htmlFor="Nom" class="form-label">Nom</label>
                                <input
                                    type="text"
                                    className="form-control input-login"
                                    name="firstName"
                                    id="validationServer03"
                                    placeholder="Dupuis"                                 
                                    {...register("firstName", {pattern: /^[A-Za-z]+$/i})}
                                    autoFocus
                                    />
                                <p >{errors.firstName?.message}</p>
                                   
                            </div>
                            <div className="form-group">
                                <label htmlFor="Prenom" class="form-label">Prénom</label>
                                <input
                                    type="text"
                                    className="form-control input-login"
                                    name="name"
                                    id="validationServer03"
                                    {...register("name", {pattern: /^[A-Za-z]+$/i })}                           
                                    placeholder="Robert"
                                    autoFocus
                                />
                            <p>{errors.name?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" class="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control input-login"
                                    name="email"
                                    id="validationServer01"
                                    aria-describedby="emailHelp"
                                    {...register("email", { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                    placeholder="robert.87@gmail.com"
                                    autoFocus
                                />
                            <p>{errors.email?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mot de passe</label>
                                <input
                                    type="password"
                                    className="form-control input-login "
                                    name="password"
                                    {...register("password", { pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/ })}
                                    id="validationServer02"
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
                        
            </div>
			<footer >
				<p className="containerTextAccroche">Rejoignez votre team dès aujourd'hui.</p>
			</footer>
</>
    );
}

export default SignUp;