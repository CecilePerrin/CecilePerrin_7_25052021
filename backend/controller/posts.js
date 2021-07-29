const models = require ('../db/models/index')
const jwt = require('jsonwebtoken');
const { Post } = models.sequelize.models


//Post

exports.createPost = (req, res, next) =>{
    const postObject = JSON.parse (req.body.post);
    if (req.file) {
        postObject = JSON.parse(req.body.post)
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/public/${
          req.file.filename
        }`
            .then(post =>{
            models.Post.create({
                title: req.body.title,
                content: req.body.content,
                file:postObject.imageUrl,
                userId: req.user.id
            });
            post => res.status(201).json(post)
        })
      }

 
}
exports.modifyPost = (req, res, next) =>{
    const postObject = req.file?
    {
      ...JSON.parse(req.body.post), //on récupére et on le parse en Objet
      imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}` //puis on modifie l'URI
    } : {...req.body}; //sinon on prend juste le corps de la req

    if (req.file){
      post.findOne({_id: req.params.id})
      .then( (post) =>{
        const filename = post.imageUrl.split('/image/')[1];
        fs.unlink(`image/${filename}`, () =>{
      Post.update({id: req.params.id}, {...postObject, id: req.params.id}) //on prend l'objet et modifie l'id pour correspondre à l'id des parametres de req.
      .then(() => res.status(200).json ({message:'post modifié'}))
      .catch(error => res.status(400).json({error}));
        });
      });
    } else{

      Post.update({id: req.params.id}, {...postObject, id: req.params.id}) //on prend l'objet et modifie l'id pour correspondre à l'id des parametres de req.
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

    Post.findAll({
        order: ['createdAt', 'DESC'],
        include:[
            {
                model : models.User,
                require : true,
            }
        ],
        limit
    })
}


exports.deletepost = (req, res, next) =>{
    if(userId == req.user.id){
        Post.findOne({where :{id: req.params.id}})
          .then( post =>{
            const filename = post.imageUrl.split('/image/')[1];
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
exports.likeOnePost= (req, res, next) =>{

}
