# GROUPOMANIA project

## What is the goal of this project ?

I had to create an corporate social network for a fictive compagny. The goal was to give to the employee the possibility to connect and post with their coworker. For this i had to make sure that they can:

-Subscribe, login and stay connected in the application
-Modify their informations (create delete update)
-Post gifs picture and texte with other people (create delete update)
-Can be moderate by someone

## Technologies used:

-Frontend: React.js, React router, React hook, yup, Bootsrap, Axios, Local storage
-Backend: Node.js, Express
-Database: MySQL, Sequelize ORM, MySQL Workbench


## Getting started

git clone the projet

### Frontend:

```
cd frontend
npm install
npm start
```

### Backend:

```
cd backend
npm install
npm start
```

### Database:

in the file "config.json" put your username et password. Make sur that you've installed MySql and create locally the base "groupomaniadb" 

then in the terminal tape :

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```




