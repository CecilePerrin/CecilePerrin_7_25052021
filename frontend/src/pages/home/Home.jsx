import React, { useState, useEffect }  from "react";
import '../../styles/post.css'
import Nav from '../../components/Nav.jsx'
import CreatePost from '../../components/CreatePost.jsx';
import UserPost from "../../components/Userpost.jsx";
import axios from "axios";
import '../home/home.css'


const Home = () => {

    const [posts, setPosts] = useState(null);
	const [inputReset, setInputReset] = useState(0)
	
	const handlePosts = async () =>{
		await axios.get('http://localhost:4200/api/posts', { headers: { Authorization:localStorage.getItem('token') } })
		.then((response) => {
			console.log("voici les posts")
			setPosts(response.data.posts);
			setInputReset(inputReset +1)
		})
		.catch(error => console.log(error));
	  }
	
	  useEffect(() => {
		if (!posts) {
			handlePosts();
		}
	});
 
	console.log(posts)
	    
    return (
        <>
            <Nav /> 
            <div className = "container-sm ">
            	<CreatePost
					key = {inputReset}
					handlePosts={handlePosts} 
				/>
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