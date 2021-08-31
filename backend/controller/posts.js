const models = require ('../db/models/index')
const jwt = require('jsonwebtoken');
const { Post } = models.sequelize.models
const fs = require('fs');
const {Like} = models.sequelize.models


//Post


exports.createPost = async (req, res, next) => {
  let postObject = req.body
  
  if(!this.content && !this.imgUrl){
    throw new Error('Vous ne pouvez pas créer de publication vide !')
  }
  if (req.file) {
    postObject.imgUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`
  }

  try {
    let post = await Post.create({
      content: req.body.content,
      imgUrl:postObject.imgUrl,
      userId: req.user.id
    })
    post = await Post.findOne({ where: { id: post.id }, include: models.User })

    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}



exports.modifyPost = (req, res, next) =>{
    const postObject = req.file?
    {
      ...JSON.parse(req.body.post), 
      imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    if (req.file){
      post.findOne({where:{id: req.params.id}})
      .then( (post) =>{
        const filename = post.imgUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
      Post.update({where:{id: req.params.id}}, {...postObject, id: req.params.id}) 
      .then(() => res.status(200).json ({message:'post modifié'}))
      .catch(error => res.status(400).json({error}));
        });
      });
    } else{

      Post.update({where:{id: req.params.id}}, {...postObject, id: req.params.id})
      .then(() => res.status(200).json ({message:'post modifié'}))
      .catch(error => res.status(400).json({error}));
    }   
}

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
 const order = req.query.order;


    const options ={
      include:[
        {
          model : models.User,
          require : true,
        }
      ],
      limit,
      order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			
    }
    Post.findAll(options)
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(404).json({ error }))
}


exports.deletepost = (req, res, next) =>{
    if(userId == req.user.id){
        Post.findOne({where :{id: req.params.id}})
          .then( post =>{
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`image/${filename}`, () =>{
              Post.destroy({where :{id: req.params.id}})
              .then(() => res.status(200).json({message :' Objet supprimé'}))
              .catch(error => res.status(400).json({error}));
            });
          })
          .catch(error => res.status(500).json({error}))

    }
};


//Comments

exports.createComment = (req, res, next) =>{


}


exports.getOneComment= (req, res, next) =>{

}


exports.getAllComments= (req, res, next) =>{


}


exports.modifyComment= (req, res, next) =>{

}


exports.deleteComment= (req, res, next) =>{

}


//Likes

exports.likeOnePost = async(req, res, next)=>{
  const userId = req.user.id;

  const likeUser = await Like.findOne({where :{userId}, postId: req.params.id})
    .then(() => res.status(200).json({message :'utilisateur et post trouvé'}))
    .catch(error => res.status(400).json({'erreur': 'utilisateur ou post demandés nexistent pas'}));
    
  if (likeUser){
    Like.destroy()
    .then(()=>{res.status(200).json({like:-1})})
  } else if (!likeUser){
    Like.create({where :{userId, postId: req.params.id}})
    .then(()=>{res.status(200).json({like:+1})})
  }
}

