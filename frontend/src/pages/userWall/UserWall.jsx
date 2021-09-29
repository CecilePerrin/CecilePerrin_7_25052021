import React from "react";
import Nav from '../../components/Nav'
import userBanner from "../../assets/building.jpg"
import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import noavatar from "../../assets/noavatar.JPG"
import { UserContext } from "../../components/UserContext.jsx";
import "../../styles/userPost.css"
import UserPost from "../../components/Userpost";



const UserWall = () =>{

	const {user} = useContext(UserContext);
	const [profileUser, setProfileUser]= useState({
		firstName:"",
		name: "",
		imageUrl:"",
		id:""
	})
	const [userPosts, setUserPosts] = useState(null);
	const name = useParams().name

	
	
	const getUserProfile = async () => {
			await axios.get(`http://localhost:4200/api/users/${name}`, { headers: { Authorization:localStorage.getItem('token') } })
			.then((response) => {
				setProfileUser(response.data.profileUser);
				console.log(response.data.profileUser)
			})
			.catch(error => console.log(error));
		};
	
	  useEffect(() => {
		if (profileUser.name === ""  ) {
			getUserProfile();
		}
	});

	const handleUserPosts = async () =>{
		const userId = profileUser.id;
		await axios.get(`http://localhost:4200/api/posts/${userId}`, { headers: { Authorization:localStorage.getItem('token') } })
		.then((response) => {
			console.log("voici les posts")
			setUserPosts(response.data.posts);
		})
		.catch(error => console.log(error));
	  }


	  useEffect(() => {
		if (!userPosts) {
			handleUserPosts();
		}
	});

	const deleteUser = (e) =>{
		e.preventDefault();
		const answer = window.confirm("êtes vous sûr?");
		if (answer) {
			axios.delete(`http://localhost:4200/api/users/delete/${name}`,{ headers: { 'Authorization':localStorage.getItem('token') } })
				.then(response=> {
					window.location = "/home";
					console.log(response)
				})    
				.catch(err => 
					console.log(err))
		} else {
		console.log("Thing was not deleted to the database.");
		}
	};

	
    return(
        <>
            <Nav />
            <div className="profileRight">
				<div className="profileRightTop">
					<div className="profileCover">
						<img
							className="profileCoverImg"
							src={userBanner}
							alt=""
						/>
							<img
								src={
									profileUser.imageUrl === "0"
									? noavatar
									:  profileUser.imageUrl
								}
                  
								alt="photo de profil utilisateur"
								className="profileUserImg"
                    		/>
					</div>
				</div>
			</div>
			{user.admin ===true ?
				<div>
					<button onClick ={deleteUser} type="button" class="btn btn-outline-danger suppbtn positionUserWall button">Supprimez ce compte
						<DeleteIcon />
					</button>
				</div>
			:null
			}
			<div className=''>
				{userPosts && (
									<>
										{userPosts.map((post) => (
											<UserPost
												key={post.id}
												post={post}
											/>
										))}
									</>
								)}
				</div>	
        </>
    )
}

export default UserWall;