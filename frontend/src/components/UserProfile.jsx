const UserProfile = ()=>{
    return(

        <div className="post">
        <div className="postWrapper">
            <div className="postTop">
            <div className="postTopLeft">
                <Link to={`/UserWall/${post.User.name}`}>
                <img
                    className="postProfileImg"
                    src={ post.User.imageUrl == "0"
                    ? noavatar
                    :  post.User.imageUrl
                    }
                    alt=""
                />
                </Link>
                <span className="postUsername">{post.User.name} {post.User.firstName}</span>
                <p className="card-text"><small className="text-muted">{date}</small></p>
            </div>
            <div className="postTopRight">
                {user.id === post.User.id || user.admin == true ? (
                    <div class="btn-group dropstart">
                    <MoreVert 
                        type="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        id="dropdownMenuOffset" 
                        data-toggle="dropdown" 
                        style={{ fontSize: "2rem" }}
                    />  
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" onClick={handleShowModify}>Modifier la publication</a></li>
                        <li><a class="dropdown-item"  onClick={() => handleDeletePost(post.id)} >Supprimer la publication</a></li>                      
                    </ul>
                    </div>
                ) : null}
            </div>
            </div>
            <div className="postCenter">
            <span className="postText">{post.content}</span>
            <img className="postImg" src={post.imgUrl} alt="" />
            </div>
            <div className="postBottom">
            <Likes
                key={post.id}
                post={post}
            />
            <div className="postBottomRight">
                <span> {comments.length} </span>
                <span onClick={handleShowComponent} className="postCommentText"> Commentaires</span>
            </div>
            </div>
            <Comment
            post={post}
            handleComment ={handleComment}
            key = {inputReset}
            />        
            {displayComponent? 
            comments.map((comment) => (
                <CommentList
                key={comment.id}
                comment={comment}
                comments={comments}
                handleComment={handleComment}
                setComments={setComments}
                post={post}
                />
            )):null}
        </div>
        {displayModify? 
        <ModifyPost
        key={post.id}
        post={post}
        handleShowModify={handleShowModify}
        content={content}
        date={date}
        />
        :null}
    </div>
  
);
}