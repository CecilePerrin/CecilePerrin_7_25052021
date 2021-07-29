import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../components/UserContext.jsx";
import Nav from '../../components/Nav'
import PictureProfile from "../../assets/helsdraw.png"
import userBanner from "../../assets/bannière4.png"
import Userpost from "../../components/Userpost"


const UserWall = () =>{
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
					<div className = "hover"></div>
						<img
							className="profileUserImg"
							src={PictureProfile}
							alt=""
							/>
				</div>
			</div>
		</div>
		<div className ="profile-container">	
			
			
		</div>
			
        </>
    )
}

export default UserWall;