import React, { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext.jsx";
import { withRouter } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import Nav from "../../components/Nav.jsx"
import axios from 'axios'
import userBanner from "../../assets/bannière4.png"
import "./profile.css"
import noavatar from "../../assets/noavatar.JPG"




const Profile = () => {
	// const [password] = useRef()
	// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	// const [passwordTest, setPasswordTest] = usestate(false)
	const [updatePassword, setNewPassword] = useState({ newPassword: "" });
    const { user, setUserData} = useContext(UserContext);
	const [file, setFile] = useState(null);
	

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
			.catch(error => console.log(error));
		console.log("Thing was deleted to the database.");
		} else {
		console.log("Thing was not deleted to the database.");
		}
	};


	const submitHandler = async (e) => {
		e.preventDefault();
		
		if (updatePassword === updatePassword.newPassword || file === null){
			return null;
		}
		else{

			const newImg = {
				imageUrl: file,
				password : updatePassword,
			};
			
			const formData = new FormData();
			formData.append('imageUrl', newImg.imageUrl, newImg.imageUrl.name);
			formData.append('password', newImg.password);
		  
			try {
			  await axios.put("http://localhost:4200/api/users/update", formData, {
				headers:{"Content-Type": "multipart/form-data",
				Authorization: localStorage.getItem('token')
			  }
			  });
			} catch (err) {}
		}
	   
	  };

    return (   
    <>
		<Nav/>
		<form onSubmit={submitHandler}>
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
									</>
								):<img	
								className="profileUserImg"
								src={
									user.imageUrl
									? user.imageUrl
									:  noavatar
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
								value={updatePassword.newPassword}
								id="password"	
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="Password"
							/>
							</div>
							<button type="submit" className="btn btn-primary btn-connexion">Validez</button>
						</div>
					
				</div>
			</div>
		</form>

		<div class="cardForm">
			<p class="card-text">Ceci désactivera votre compte.
			Vous vous apprêtez à lancer la procédure de désactivation de votre compte Groupomania. Votre nom d'affichage, votre @nomdutilisateur et votre profil public ne seront plus visibles sur Groupomania.com
			</p>
			<button onClick ={deleteUser} type="button" class="btn btn-outline-danger suppbtn">Supprimez votre compte</button>
		</div>
			
			
      </>
      
    );
   }


export default withRouter(Profile);





