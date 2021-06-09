const bcrypt = require ('bcrypt'); //plug in pour hasher les mdp
// const User = require('../models/user');

const models = require ('../models/index')

const cryptojs = require('crypto-js');//module pour chiffrer l'email dans la BDD

const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const newToken = user => {
  token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h'
  })
  return { user, token }
}

//Fonction qui va crypter le mdp + création d'un nouveau User avec ce mdp puis l'enregistre
exports.signup = (req, res, next) =>{
  // const password = req.body.password;
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

  // User.findOne({email: req.body.email})//adress mail unique utilisateur pour qui l'adress mail correspond à l'adresse mail dans la req
  //     .then(user => {
  //         if(!user){
  //             return res.status(401).json({error: "utilisateur non trouvé"})
  //         }
  //         bcrypt.compare(req.body.password, user.password) // on compare le mdp envoyé par l'utilisateur avec celui qui est enregistré.
  //             .then(valid =>{ //ici on reçoit un boolean et donc si on reçoit false : mdp invalide
  //                 if (!valid){
  //                     return res.status(401).json({error:'mot de passe incorrect'})
  //                 }
  //                 res.status(200).json({
  //                     userId: user._id,
  //                     token: jwt.sign( //on appel une fonction qui prend deux arguments : les données que l'on vont encoder (payload) et la clé secrete
  //                         {userId: user._id},
  //                         process.env.TOKEN_KEY,
  //                         {expiresIn:'24h'} //ici on encode l'user Id pour qu'il soit unique à l'utilisateur et éviter que d'autres puisse faire des modifs
  //                     )
  //                 });
  //             })
  //             .catch(error => res.status(500).json({error}))
  //     })
  //     .catch(error => res.status(500).json({error}));
};




exports.profile = (req, res, next) =>{

}

exports.updateProfile = (req, res, next) =>{
    
}


exports.deleteProfile = (req, res, next) =>{

}
