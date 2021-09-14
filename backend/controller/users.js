const bcrypt = require ('bcrypt'); //plug in pour hasher les mdp
const models = require ('../db/models/index')
const jwt = require('jsonwebtoken');
const { User } = models.sequelize.models
const passwordValidation = require('password-validator')
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
              models.User.create({
                  email: req.body.email,
                  password: hash,
                  firstName:req.body.firstName,
                  name: req.body.name
              });
              user => res.status(201).json(newToken(user))
          })
          .catch(error =>res.status(500).json({error}));
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
            .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};



exports.getOneUser = async (req, res, next) =>{
  try {
    		const user = await models.User.findOne({
    			attributes: ["id", "firstName","name", "email", "imageUrl"],
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

  exports.updateProfile = async (req, res ) =>{

    let userObject = req.body

    if (req.file) {
      userObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`
    }
    const options = {where:{id : req.user.id}};
    const imageUrl = userObject.imageUrl;
    const values = {imageUrl}
    
       try {
          await models.User.update( values, options)
          if(req.fil)
         res.status(201).json({message:'Votre image de profile est modifiée' })
       } catch (error) {
         console.log(error)
         res.status(400).json({ error })
       } 

     
  }


  exports.updatePassword = async (req, res) =>{ 
    await User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if(!user){
            return res.status(401).json({error: "utilisateur non trouvé"})
        }
        bcrypt.compare(req.body.password, user.password) 
          .then(valid =>{ 
            if (!valid){
                return res.status(401).json({error:'mot de passe incorrect'})
            }
            if (!schema.validate(req.body.password)){
              res.status(400).json({error:"mot de passe invalide"})
             }else if(schema.validate(req.body.password)){
        
              const salt =  bcrypt.genSalt(10);
              const password = bcrypt.hash(req.body.password, salt);
              const values = { password}
              const options = {where:{id : req.user.id}}; 
        
                try {
                   models.User.update( values, options)
                  res.status(201).json({message:'Mot de passe modifié!' })
                  } catch (error) {
                  console.log(error)
                  res.status(400).json({ error })
                  }
            }      
        })
        .catch(error => res.status(500).json({error}))
      }) 
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
    .catch((err)=>{
      console.log("Error : ",err)
  });
}

