import React, { useState, useEffect }  from "react";
import '../../styles/post.css'
import Nav from '../../components/Nav.jsx'
import CreatePost from '../../components/CreatePost.jsx';
import UserPost from "../../components/Userpost.jsx";
// import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
    const [posts, setPosts] = useState(null);
	
	useEffect(() => {
		const handlePosts = async () => {	
			await axios.get('http://localhost:4200/api/posts', { headers: { Authorization:localStorage.getItem('token') } })
				.then((response) => {
					console.log("voici les posts")
					setPosts(response.data.posts);
					
				})
				.catch(error => console.log(error));
		};if (!posts){
			handlePosts();
		}
		
	}, [posts]);
	
	console.log(posts)
	    
    return (
        <>
            <Nav /> 
            <div className = "container-sm">
            <CreatePost />
				<div className=''>
							{posts && (
								<>
									{posts.map((post) => (
										<UserPost
											key={post.id}
											post={post}
										/>
									))}
								</>
							)}
				</div>	
            </div>
          </>
    )
};



export default Home;