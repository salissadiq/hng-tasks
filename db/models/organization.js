'use strict';
const {
  Sequelize
} = require('sequelize');

const sequelize = require("../../config/database");

module.exports = sequelize.define('organization', {
      orgId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
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
      modelName: 'organization'
    })