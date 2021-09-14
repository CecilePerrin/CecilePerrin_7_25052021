'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' })
      Post.hasMany(models.Like)
      Post.hasMany(models.Comment)
    }
  };
  Post.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    likeNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};