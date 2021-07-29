import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../components/UserContext.jsx";
import { withRouter } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import Nav from "../../components/Nav.jsx"
import axios from 'axios'
import PictureProfile from "../../assets/helsdraw.png"
import userBanner from "../../assets/bannière4.png"
import "./profile.css"



const Profile = () => {

	const [updatePassword, setNewPassword] = useState({ newPassword: "" });
    const { user, setUserData} = useContext(UserContext);
	const inputFile = useRef(null);
	const [file, setFile] = useState(null);
	const onButtonClick = () => {
	   inputFile.current.click();
	  };

	const deleteUser = (e) =>{
		e.preventDfault()
        axios.delete('http://localhost:4200/api/users/delete',{ headers: { 'Authorization':localStorage.getItem('token') } })
        .then(response=> {
			localStorage.clear();
			window.location = "/";
			console.log("vous avez supp votre compte")
			console.log(response)
		})    
        .catch(error => console.log(error));
	};

	const uptdatePassword = () =>{
		axios.put('http://localhost:4200/api/users/update',{password: updatePassword} ,{ headers: { 'Authorization':localStorage.getItem('token') } })
		.then(response=> {
			console.log("vous avez changer votre mot de passe")
			console.log(response)
		})    
		.catch(error => console.log(error));
	};

    return (   
    <>
		<Nav/>
		<div className="profileRight">
			<div className="profileRightTop">
				<div className="profileCover">
					<img
							className="profileCoverImg"
							src={userBanner}
							alt=""
					/>
					<div className = "hover"></div>
						<img
							className="profileUserImg"
							src={PictureProfile}
							alt=""
							/>
					<form className="shareBottom">
						<label htmlFor="file" className="shareOption">
							<CreateIcon className="modifyPicture" onClick={onButtonClick}/>
								<input
									style={{ display: "none" }}
									type="file"
									id="file"
									ref={inputFile}
									accept=".png,.jpeg,.jpg"
								/>
						</label>
					</form>	
				</div>
			</div>
		</div>
		<div className ="profile-container">
			<div className ="card-container">
				<div className="card welcome">
					<form  className="login container-fluid" >
						<h5 className="card-title "> Changez votre mot de passe </h5>	
						<div className="form-group">
							<label htmlFor="exampleInputPassword">Nouveau mot de passe</label>
							<input
									
								type="password"
								className="form-control"
								name="password"
								value={uptdatePassword.newPassword}
								id="password"	
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="Password"
							/>
						</div>
						<button  onClick = {() => uptdatePassword()} type="button" className="btn btn-primary btn-connexion">Validez</button>
					</form>
				</div>

				<div class="w-50">
					<div class="card-body">
						<h4> {user.firstName}</h4>
						<h5>{user.name}</h5>
						<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
						<button onClick ={deleteUser} type="button" class="btn btn-outline-danger suppbtn">Supprimez votre compte</button>
					</div>
				</div>	
			</div>	
		</div>
			
      </>
      
    );
   }


export default withRouter(Profile);



