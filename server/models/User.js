// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,  // ← cambiar esto si estaba en false
    unique: true
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: true, // ← esto soluciona el error
  },
  profileImage: {
    type: DataTypes.STRING, // URL o nombre de archivo
    allowNull: true
  }
});

module.exports = User;