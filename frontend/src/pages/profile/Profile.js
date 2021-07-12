import React, { useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { withRouter } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import Nav from "../../components/Nav"
import Footer from "../../components/Footer";
import PictureProfile from "../../assets/helsdraw.png"
import "./profile.css"

const Profile = () => {

    const { user, setUserData} = useContext(UserContext);
	
    return (   
    <>
		<Nav/>
			<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<div className = "hover"></div>					
								<img
									className="profileUserImg"
									src={PictureProfile}
									alt=""
								/>
							<CreateIcon className="modifyPicture"/>
            			</div>
					</div>
				</div>
			<div className ="profile-container">
				<div className="profileInfo">
           		 </div>

				<div className="card welcome">
					<h4 className="profileInfoName">{user.name}</h4>
					<div className="card-body">
						<h5 className="card-title "> Changez votre mot de passe </h5>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword">Mot de passe actuel</label>
						<input
							type="password"
							className="form-control input-login "
							name="password"
							placeholder="Mot de passe"
							autoFocus
						/>
						
               		 </div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword">Nouveau mot de passe</label>
						<input
							type="password"
							className="form-control input-login "
							name="password"
							placeholder="Mot de passe"
							autoFocus
						/>	
               		 </div>
				</div>
				<button type="button" class="btn btn-outline-danger suppbtn">Supprimez votre compte</button>
			</div>
			<Footer/>
			
      </>
      
    );
   }


export default withRouter(Profile);