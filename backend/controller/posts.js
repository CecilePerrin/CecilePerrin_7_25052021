const models = require ('../db/models/index')
const jwt = require('jsonwebtoken');
const { Post } = models.sequelize.models
const fs = require('fs');
const {Like} = models.sequelize.models
const {Comment} = models.sequelize.models


//Post


exports.createPost = async (req, res, next) => {
  let postObject = req.body
  
  if (req.file) {
    postObject.imgUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`
  }

  try {
    let post = await Post.create({
      content: req.body.content,
      imgUrl:postObject.imgUrl,
      userId: req.user.id,
    })
    post = await Post.findOne({ where: { id: post.id }, include: models.User })

    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}



exports.modifyPost = (req, res, next) =>{
  const content = req.body.content
  const options = {where:{id : req.params.id}};
  const values = {content}
  
  if (req.file){
      const imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      console.log(imgUrl)
      const values = {content, imgUrl}
      Post.findOne(options)
      .then( (post) =>{
        const filename = post.imgUrl.split('/images/')[1];
        console.log(values)
        fs.unlink(`images/${filename}`, () =>{
      Post.update(values, options) 
      .then(() => res.status(200).json ({message:'post modifié'}))
      .catch(error => res.status(400).json({error}));
        });
      });
    } else{
      Post.update( values, options)
      .then(() => res.status(200).json ({message:'post modifié'}))
      .catch(error => res.status(400).json({error}));
    }   
}


// exports.modifyPost=(req, res)=>{
//   const postObject = req.body

//   if (req.file) {
//     postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${
//       req.file.filename
//     }`
//   }
//   const options = {where:{id : req.post.id}};
//   const imageUrl = postObject.imageUrl;
//   const values = {imageUrl}
  
//      try {
//         await Post.update( values, options)
//         if(req.fil){
//           Post.findOne({where:{id: req.params.id}})
//           .then( (post) =>{
//             const filename = post.imgUrl.split('/images/')[1];
//             fs.unlink(`images/${filename}`
//         }
//        res.status(201).json({message:'Votre publication est modifiée' })
//      } catch (error) {
//        console.log(error)
//        res.status(400).json({ error })
//      } 

   
// }
// }

exports.getOnePost = (req, res, next) =>{
    Post.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: models.User
          }
        ]
      })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }))
    }
    

exports.getAllPost = (req, res, next) =>{
 const limit = 10
    const options ={
      include:[
        {
          model : models.User,
          require : true,
        },
        {
          model : models.Comment,
          require : false,
        },
        {
          model : models.Like,
          require : false,
        },
        
      ],
      group:'post.id',
      limit,
      order:  [['createdAt', 'DESC']],
			
    }
    Post.findAll(options)
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(404).json({ error }))
   
}


exports.deletepost = (req, res, next) =>{
   Post.findOne({where :{id: req.params.id}})
    .then( post =>{
      const filename = post.imgUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
        Post.destroy({where :{id: req.params.id}})
        .then(() => res.status(200).json({message :' Objet supprimé'}))
        .catch(error => res.status(400).json({error}));
      });
    })
    .catch(error => res.status(500).json({error})) 
};

//LIKE 

exports.likeOnePost = async(req, res, next)=>{
  try {
    const existingLike = await Like.findOne({
      where: { userId: req.user.id, postId: req.params.postId }
    })

    if (existingLike) {
      await existingLike.destroy()
      res.status(200).json({ like: false })
    } else {
      await Like.create({ userId: req.user.id, postId: req.params.postId })
      res.status(201).json({ like: true })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getAllLikes = async (req, res, next) =>{
  await Like.findAll({
    where: { postId: req.params.postId },
    include: models.User})
    .then(likes => res.status(200).json({ likes }))
    .catch(error => res.status(404).json({ error }))
}


//Comments

exports.createComment = async (req, res, next) =>{
  if (req.body.content) {
    try {
      let comment = await Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: req.params.postId
      })
      comment = await Comment.findOne({ where: { id: comment.id }, include: models.User })
  
      res.status(201).json({ comment })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    } 
  }


}


exports.getAllComments= (req, res, next) =>{
  const limit = 10
  const options ={
    where:{ postId:req.params.postId},
    include:[
      {
        model : models.User,
        require : true,
      },
     
    ],
    limit,
    order:  [['createdAt', 'DESC']],
    
  }
  Comment.findAll(options)
  .then(comments => res.status(200).json({ comments }))
  .catch(error => res.status(404).json({ error }))

}


exports.modifyComment= async (req, res, next) =>{
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id, userId: req.user.id
      },
      include: models.User
    });

    if (!comment) {
      throw new Error("désolé vous ne pouvez pas modifier ce commentaire");
    } else{
      comment.update(req.body)
      .then(comment=> res.status(200).json({comment}))
    }   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
  }


exports.deleteComment= async (req, res, next) =>{
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id, userId: req.user.id
      },
      include: models.User
    });

    if (!comment) {
      throw new Error("désolé vous ne pouvez pas supprimer ce commentaire");
    } else{
      comment.destroy()
      .then(() => res.status(200).json({emssage:'commentaire supprimé'}))
    }   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




