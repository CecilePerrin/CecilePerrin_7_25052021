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
import { handleUser } from "../../API/user.js";


const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const schema = yup.object().shape({
	password: yup
	.string()
	.required('veuillez renseigner un mot de passe')
	.matches(PASSWORD_REGEX, "veuillez rentrer un mot de passe plus fort")
	.min(8, "votre mot de passe doit faire plus de 8 caractères")
});


const Profile = () => {
	const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)});

	const [oldPassword, setOldPassword]= useState({oldPassword:""})
	const [auth, setAuth]=useState(false)
	const {user} = useContext(UserContext);
	const [file, setFile] = useState(null);
	const [error, setError] = useState({errorMessage:""});
	const userId = user.id
	
	const confirmPassword = async () =>{
		await axios.post(`http://localhost:4200/api/users/confirmPassword/${userId}`,oldPassword,{ headers: { Authorization:localStorage.getItem('token') } })
		.then(response=> {
			setAuth(true);
			})    
		.catch(err => 
			setError({ errorMessage:err.response.data.error}))
	};

	const deleteUser = (e) =>{
		e.preventDefault();
		const answer = window.confirm("êtes vous sûr?");
		if (answer) {
			axios.delete('http://localhost:4200/api/users/delete',{ headers: { 'Authorization':localStorage.getItem('token') } })
				.then(response=> {
					localStorage.clear();
					window.location = "/";
				})    
				.catch(err => 
					setError({ errorMessage:err.response.data.error}))
					
		} else {
		console.log("Thing was not deleted to the database.");
		}
	};


	const modifyPassword = async(data)=>{
		console.log(data)
		await axios.put("http://localhost:4200/api/users/updatePassword", data, {headers:{Authorization: localStorage.getItem('token')}})
			.then(response=> {
				console.log(response.data.message)
				alert("Vous avez changé votre mot de passe")
				window.location.reload();
			}) 
			.catch(err => 
				setError({ errorMessage:err.response.data.error}))
				console.log(error)	
	};


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
				handleUser(res.data.user)
				window.location.reload();
				setFile(null)
		})
	};

    return (   
	<>	
	<Nav/>
		<main>
			<form onSubmit={modifyProfilPicture}>
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={userBanner}
								alt="cover image"	
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
								alt="image profil utilisateur"
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
			<div className ="profile-container">
				<h4> {user.name} {user.firstName}</h4>
				<div className="cardForm">
				<div className="login container-fluid" >
				{auth === true 
					? null: 
					<form onSubmit= {confirmPassword}>
						<h5 className="card-title "> Changez votre mot de passe </h5>
							<div className="form-group">
								<label htmlFor="password">Mot de passe actuel </label>
								<input
									type="password"
									aria-label="Écrire votre mot de passe actuel"
									className="form-control"
									name="oldPassword"
									id="oldPassword"
									onChange={e=>setOldPassword({...oldPassword, oldPassword:e.target.value})}
									placeholder="Mot de passe actuel"
								/>
								
							</div>
							
							<button type="button" className="btn btn-primary btn-connexion" onClick={confirmPassword}>Validez</button>
					</form>}	
					{auth === true ? (
						<form onSubmit= {handleSubmit(modifyPassword)}>
							<div className="form-group">
								<label htmlFor="password">Nouveau mot de passe</label>
								<input
									type="password"
									aria-label="Écrire votre nouveau mot de passe"
									className="form-control"
									name="password"
									id="password"
									{...register("password", { pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/ })}
									placeholder="Password"
								/>
								<p style= {{color:"red"}}>{errors.password?.message}</p>
							</div>
							<button type="submit" className="btn btn-primary btn-connexion">Validez</button>
						</form>
					): null}
				</div>
					{error.errorMessage !== ""?(
						<div class="alert alert-warning alert-dismissible " role="alert">
						{error.errorMessage}
						</div>
					):null}
				</div>
			</div>
			
			<div class="cardForm">
				<p class="card-text">Ceci supprimera votre compte.
					Vous vous apprêtez à lancer la procédure de désactivation de votre compte Groupomania. Votre nom d'affichage, votre @nomdutilisateur et votre profil public seront supprimés ainsi que toutes vos intérations sur Groupomania.com
				</p>
				<button onClick ={deleteUser} type="button" class="btn btn-outline-danger suppbtn">
					Supprimez votre compte
					<DeleteIcon />
				</button>
			</div>
		</main>
	</>  
);
}
   
export default withRouter(Profile);







