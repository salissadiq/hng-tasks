const { sequelize, User, Organisation, UserOrganisation } = require("../db/models")

const createOrganization = async (request, response, next) => {
    response.json({
        message: "Create orga"
    })
}

const getAllOrganization = async (request, response, next) => {
    response.json({
        message: "Get All organization"
    })
}

const getOrganization = async (request, response, next) => {
    response.json({
        message: "Ftech one org"
    })
}

module.exports = {createOrganization, getOrganization, getAllOrganization}