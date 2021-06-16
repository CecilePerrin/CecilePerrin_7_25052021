const bcrypt = require ('bcrypt'); //plug in pour hasher les mdp
// const User = require('../models/user');
const models = require ('../db/models/index')
const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const newToken = user => {
  token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h'
  })
  return { user, token }
}


exports.signup = (req, res, next) =>{

     models.User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        name: req.body.name,
      })

      .then(user => res.status(201).json(newToken(user)))
      .catch(error => res.status(401).json({ error: error }))
};


console.log("Connected!");
  

exports.login = (req, res, next) =>{
  // User.findOne({ where: { email } })
  //       .then(user => {
  //           if(!user){
  //               return res.status(401).json({error: "utilisateur non trouvé"})
  //           }
  //           bcrypt.compare(req.body.password, user.password) // on compare le mdp envoyé par l'utilisateur avec celui qui est enregistré.
  //           .then(valid =>{ //ici on reçoit un boolean et donc si on reçoit false : mdp invalide
  //               if (!valid){
  //                   return res.status(401).json({error:'mot de passe incorrect'})
  //               }
  //               res.status(201).json(newToken(user))
                
  //           })
  //           .catch(error => res.status(500).json({error}))
  //   })
  //   .catch(error => res.status(500).json({error}));
};



// exports.getOneUser = (req, res, next) => {
  
//   User.findOne({ where: { id: req.params.id } })
//     .then(user => res.status(200).json({ user }))
//     .catch(error => res.status(404).json({ error }))
// }

// exports.getAllUser = (req, res, next) =>{
//   User.find()
//     .then(user => res.status(200).json(user))
//     .catch(error => res.status(400).json({error}));
// };

exports.profile = (req, res, next) =>{

}

exports.updateProfile = (req, res, next) =>{
    
}


exports.deleteProfile = (req, res, next) =>{

}
