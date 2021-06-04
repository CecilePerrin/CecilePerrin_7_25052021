const bcrypt = require ('bcrypt'); //plug in pour hasher les mdp
const User = require('../models/users');
const cryptojs = require('crypto-js');//module pour chiffrer l'email dans la BDD
const passwordValidation = require('password-validator')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

var schema = new passwordValidation();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost', 
  user: process.env.DB_USERNAME,
  database: 'groupomaniaDB',
  password: process.env.DB_PASSWORD
});

// simple query
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//Fonction qui va crypter le mdp + création d'un nouveau User avec ce mdp puis l'enregistre
exports.signup = (req, res, next) =>{
    const userId = uuidv4();
    const id = userId
    const firstName = req.body.firstName
    const name = req.body.name
    const password= req.body.password
    const email = req.body.email

    connection.query(
        "INSERT INTO users (id, firstName, name, email, password) VALUES (?,?,?,?,?)",
        [id, firstName, name, email, password],
        (err,result)=>{
            console.log(err);
        }
        );
};
   
//pour connecter de nouveaux utilisateurs
exports.login = (req, res, next) =>{
   
};




exports.profile = (req, res, next) =>{

}

exports.updateProfile = (req, res, next) =>{
    
}


exports.deleteProfile = (req, res, next) =>{

}
