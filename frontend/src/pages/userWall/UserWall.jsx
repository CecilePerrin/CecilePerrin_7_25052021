import React from "react";

import Nav from '../../components/Nav'

import userBanner from "../../assets/bannière4.png"



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
							// src={PictureProfile}
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