import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { UserContext } from "../../components/UserContext.jsx";
import { withRouter } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import Nav from "../../components/Nav.jsx"
import axios from 'axios'
import userBanner from "../../assets/building.jpg"
import "./profile.css"
import noavatar from "../../assets/noavatar.JPG"
import DeleteIcon from "@material-ui/icons/Delete";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"


const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const schema = yup.object().shape({
	password: yup
	.string()
	.required('veuillez renseigner un mot de passe')
	.matches(PASSWORD_REGEX, "veuillez rentrer un mot de passe plus fort")
	.min(8, "votre mot de passe doit faire plus de 8 caractères")
});

const Profile = (handleUser) => {
	
	const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const {user, setUser} = useContext(UserContext);
	const [file, setFile] = useState(null);
	const [error, setError] = useState({errorMessage:""})
	console.log(errors)

	const deleteUser = (e) =>{
		e.preventDefault();
		const answer = window.confirm("êtes vous sûr?");
		if (answer) {
			axios.delete('http://localhost:4200/api/users/delete',{ headers: { 'Authorization':localStorage.getItem('token') } })
				.then(response=> {
					localStorage.clear();
					window.location = "/";
					console.log("vous avez supp votre compte")
					console.log(response)
				})    
				.catch(err => 
					setError({ errorMessage:err.response.data.error}))
					console.log(error)
					console.log("Thing was deleted to the database.");
		} else {
		console.log("Thing was not deleted to the database.");
		}
	};


	const modifyPassword = async(data)=>{
		console.log(data)
		await axios.put("http://localhost:4200/api/users/updatePassword", data, {headers:{Authorization: localStorage.getItem('token')}})
			.then(response=> {
				console.log(response)
				window.location.reload();
			}) 
			.catch(err => 
				setError({ errorMessage:err.response.data.error}))
				console.log(error)
			
	}


	const modifyProfilPicture =async(e)=>{
		e.preventDefault();
		const newImg = {
			imageUrl: file,
		};
		const formData = new FormData();
		formData.append('imageUrl', newImg.imageUrl, newImg.imageUrl.name);

		await axios.put("http://localhost:4200/api/users/update", formData, {
				headers:{"Content-Type": "multipart/form-data",
				Authorization: localStorage.getItem('token')
			  	}	  
			  })
			  .then((res) => {
				setUser(res.data.values)
				setFile(null)
		})
	}

    return (   
    <>
		<Nav/>
		<form onSubmit={modifyProfilPicture}>
			<div className="profileRight">
				<div className="profileRightTop">
					<div className="profileCover">
						<img
							className="profileCoverImg"
							src={userBanner}
							alt=""
						/>
						<img 
							className = "backgroundImg"
							alt=""	
					
						/>
						{file ?(
							<>
								<img 
									className = "hover"
									src={URL.createObjectURL(file)}
									alt=""
								/>
								<button type="submit" className="btn btn-connexion position">Validez</button>
							</>
						):<img	
							className="profileUserImg"
							src={
								user.imageUrl === "0"
								? noavatar
								:  user.imageUrl
							}
							alt=""
						/>}
						<div className="shareBottom">
							<label htmlFor="file" className="shareOption">
							<CreateIcon className="modifyPicture" />
							<input
								style={{ display: "none" }}
								type="file"
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e) => setFile(e.target.files[0])}
							/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</form>
		<form onSubmit= {handleSubmit(modifyPassword)}>
			<div className ="profile-container">
					<h4> {user.name} {user.firstName}</h4>
					<div className="cardForm">
						<div className="login container-fluid" >
							<h5 className="card-title "> Changez votre mot de passe </h5>
							<div className="form-group">
								<label htmlFor="exampleInputPassword">Nouveau mot de passe</label>
								<input
									type="password"
									className="form-control"
									name="password"
									id="password"
									{...register("password", { pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/ })}
									placeholder="Password"
								/>
								<p style= {{color:"red"}}>{errors.password?.message}</p>
							</div>
							{error.errorMessage !== ""?(	
								<div class="alert alert-warning alert-dismissible " role="alert">
									{error.errorMessage}
								</div>
							
							):null}
							<button type="submit" className="btn btn-primary btn-connexion">Validez</button>
						</div>
						{error.errorMessage !== ""?(
							<div class="alert alert-warning alert-dismissible " role="alert">
							{error.errorMessage}
							</div>
						
						):null}
					</div>
			</div>
		</form>
		<div class="cardForm">
			<p class="card-text">Ceci supprimera votre compte.
			Vous vous apprêtez à lancer la procédure de désactivation de votre compte Groupomania. Votre nom d'affichage, votre @nomdutilisateur et votre profil public seront supprimés ainsi que toutes vos intérations sur Groupomania.com
			</p>
			<button onClick ={deleteUser} type="button" class="btn btn-outline-danger suppbtn">Supprimez votre compte
			<DeleteIcon /></button>
		</div>	
      </>  
    );
   }
   
export default withRouter(Profile);





