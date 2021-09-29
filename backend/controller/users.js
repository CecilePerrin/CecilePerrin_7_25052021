const bcrypt = require ('bcrypt'); //plug in pour hasher les mdp
const models = require ('../db/models/index')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { User } = models.sequelize.models
const passwordValidation = require('password-validator');
const { Sequelize } = models.Sequelize
require('dotenv').config();


const newToken = user => {
 let token = 
  "Bearer " + jwt.sign({ id: user.id }, 'TOKEN_KEY', {
    expiresIn: '4h'
  })
  return { user, token }
}
var schema = new passwordValidation();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

exports.signup = (req, res, next) =>{
  
  if (!schema.validate(req.body.password)){
     res.status(400).json({error:"mot de passe invalide"})
    } else if (schema.validate(req.body.password)){
      bcrypt.hash(req.body.password,10)
          .then(hash =>{
              User.create({
                  email: req.body.email,
                  password: hash,
                  firstName:req.body.firstName,
                  name: req.body.name
              })
              .then(user => res.status(201).json(newToken(user)))
              .catch(error=> res.status(401).json({error:error}))
          })
          .catch(error =>res.status(500).json({error:error}));
          
      };
};


console.log("Connected to the server");


exports.login = (req, res, next) =>{
  User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(!user){
                return res.status(401).json({error: "utilisateur non trouvé"})
            }
            bcrypt.compare(req.body.password, user.password) 
            .then(valid =>{ 
                if (!valid){
                    return res.status(401).json({error:'mot de passe incorrect'})
                }
                res.status(201).json(newToken(user))
                console.log("User logged in");
                
            })
            .catch(error => res.status(500).json({error:error}))
    })
    .catch(error => res.status(500).json({error:error}));
};


exports.getOneUser = async (req, res, next) =>{
  try {
    		const user = await models.User.findOne({
    			attributes: ["id", "firstName","name", "email", "imageUrl", "admin"],
    			where: {
    				id: req.user.id
    			}
    		});
    
    		if (!user) {
    			throw new Error("désolé nous ne trouvons pas votre compte");
    		}
    		res.status(200).json({ user });
    	} catch (error) {
    		res.status(400).json({ error: error.message });
    	}
}


exports.getAllUser = async (req, res, next)=>{
  const options = {
    where: Sequelize.where(Sequelize.fn('concat', Sequelize.col('firstName'),Sequelize.col('name')),
      {
       [Sequelize.Op.like]:`%${req.query.search}%`
       }
    ),  

    }
    User.findAll(options)
    .then((users) => res.status(200).json ({users}))
    .catch(error => res.status(400).json({error:error}));
 
}


exports.getUserProfile = async (req, res, next)=>{
  try{
    const profileUser = await User.findOne({
      attributes: ["id", "firstName","name", "imageUrl"],
      where: {
        name: req.params.name
      }
    })
    if (!profileUser) {
      throw new Error("désolé nous ne trouvons pas ce compte");
    }
    res.status(200).json({ profileUser });
  }catch (error){
    res.status(400).json({ error: error.message });
  }
}

exports.updateProfile = async (req, res, next ) =>{
  const options = {where:{id : req.user.id}};
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  const values = {imageUrl}

  User.findOne(options)
  .then( (user) =>{
    const filename = user.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
  User.update(values, options) 
  .then(() => res.status(200).json ({values}))
  .catch(error => res.status(400).json({error:error}));
    });
  });       
}
    
    
exports.updatePassword = async (req, res, next) =>{ 
  const password = await bcrypt.hash(req.body.password, 10);
  const values = { password}
  const options = {where:{id : req.user.id}};

        User.update(options,values)
          .then(res.status(201).json({message:'Mot de passe modifié!' }))  
          .catch(error=>res.status(400).json({ error:error }) )       
}



exports.deleteProfile =  (req, res, next) =>{
 models.User.findOne({ where: { id: req.user.id } })
    .then(
      models.User.destroy({
        where:{
          id:req.user.id 
        }
      })
    .then(
      res.status(200).json({message: "compte supprimé"})
    ))
    .catch((error)=>{
      res.status(400).json({ error:error }) 
  });
}

exports.deleteProfileAdmin =  (req, res, next) =>{
   User.destroy({
        where:{
          name: req.params.name
        }
      })
    .then(
      res.status(200).json({message: "compte supprimé"})
    )
    .catch((error)=>{
      res.status(400).json({ error:error }) 
  });
}