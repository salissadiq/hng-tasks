// models/UserOrganisation.js
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
    const UserOrganisation = sequelize.define('UserOrganisation', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
    userId: {
      type: DataTypes.INTEGER,
    },
    orgId: {
      type: DataTypes.INTEGER,
    }
  });
  UserOrganisation.beforeCreate(async (userOrg) => {
        userOrg.id = uuidv4();
    })
  return UserOrganisation;
};