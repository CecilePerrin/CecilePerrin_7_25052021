const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const path = require('path');
const cors = require ('cors');
const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const app = express();
require('dotenv').config();

app.use(cors());

app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users/', userRoutes);

app.use('/api/posts/', postsRoutes);


module.exports = app;