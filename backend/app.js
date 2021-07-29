const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const path = require('path');
const cors = require ('cors');
const userRoutes = require('./routes/users');
// const postsRoutes = require('./routes/posts');
const app = express();
require('dotenv').config();

app.use(cors());

app.use((req, res, next) => { // middleware appliqué à toutes les requêtes envoyés au serveur et permet d'accèder à l'application en éviter les erreurs CORSs
    res.setHeader('Access-Control-Allow-Origin', '*'); //origin autorisé = tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //on donne l'autorisation d'utiliser certaines entêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  
app.use(bodyParser.json()); //.json est une méthode de l'objet bodyParser qui va transformer le corps des requêtes en objets JSON
app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());

app.use('/image', express.static(path.join(__dirname, 'image')));

app.use('/api/users/', userRoutes);

// app.use('/api/posts/', postsRoutes);


module.exports = app;