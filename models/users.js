'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};