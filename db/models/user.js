'use strict';
const {
  Sequelize
} = require('sequelize');

const sequelize = require("../../config/database");

module.exports = sequelize.define('user', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Must a valid email"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
}, {
      freezeTableName: true,
      modelName: 'user'
    })