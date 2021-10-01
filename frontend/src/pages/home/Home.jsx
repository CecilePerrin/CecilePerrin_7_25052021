import React, { useState, useEffect }  from "react";
import '../../styles/post.css'
import Nav from '../../components/Nav.jsx'
import CreatePost from '../../components/CreatePost.jsx';
import UserPost from "../../components/Userpost.jsx";
import axios from "axios";


const Home = ({ValidToken}) => {

	const [posts, setPosts] = useState(0);
	const [inputReset, setInputReset] = useState(0)

	const handlePosts = async () =>{
		await axios.get('http://localhost:4200/api/posts', { headers: { Authorization:localStorage.getItem('token') } })
		.then((response) => {
			console.log("voici les posts")
			setPosts(response.data.posts);
			ValidToken()
		})
		.catch(error => console.log(error));
		}

	useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	});
 
	    
return (
	<>
		<header>
			<Nav
				posts={posts} 
			/> 
		</header>
		<main>
			<div className = "container-sm ">
				<CreatePost
					key={inputReset}
					posts={posts}
					setPosts={setPosts}
					handlePosts={handlePosts} 
				/>
				<div className=''>
					{posts && (
						<>
							{posts.map((post) => (
								<UserPost
									key={post.id}
									post={post}
									posts={posts}
									setPosts={setPosts}
									handlePosts={handlePosts} 
								/>
							))}
						</>
					)}
				</div>	
			</div>
		</main>
	</>
    )
};



export default Home;