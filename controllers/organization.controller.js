const { sequelize, User, Organisation, UserOrganisation } = require("../db/models")
const catchAsync = require("../utils/catchAsync");
const { validateOrganisation, fieldValidationHandler } = require("../utils/fieldValidations")

const createOrganization = async (request, response, next) => {
const catchAsync = require("../utils/catchAsync");
    const { error } = validateOrganisation(request.body)
    if (error) return response.status(422).json(fieldValidationHandler(error.details[0]))
    const { name, description } = request.body;
    const newOrg = await Organisation.create({ name, description })
    
    if(!newOrg) return response.status(400).json({
        status: "Bad Request",
        message: "Client error",
        statusCode: 400
    })
    const result = newOrg.toJSON()
        delete result.createdAt
        delete result.updatedAt
        response.status(201).json({
        status: "success",
        message: "Organisation created successfully",
        data: result
    })
}

const getAllOrganization = async (request, response, next) => {
    const organisations = await Organisation.findAll()
    response.status(200).json({
        status: "success",
        message: "Fetched Organisations",
        data: {
        organisations
        }
    })
}

const getOrganization = async (request, response, next) => {
    const { orgId } = request.params
    let organisation;
    if (orgId !== null) {
        organisation = await Organisation.findByPk(orgId)
    }
    if (!organisation)
        return response.status(404).send({
            status: "Not found",
            message: "No Organisation found with that ID",
            statusCode: 404
        })
        const result = organisation.toJSON()
        delete result.createdAt
        delete result.updatedAt
    response.status(200).json({
        status: "success",
        message: "Fetcher single organisation",
        data: result
    })
}

const addUserToOrganisation = catchAsync(async (request, response) => {
    const { orgId } = request.params
    const {userId} = request.body
    let organisation;
    if (orgId !== null) {
        organisation = await Organisation.findByPk(orgId)
    }
    if (!organisation)
        return response.status(404).send({
            status: "Not found",
            message: "No Organisation found with that ID",
            statusCode: 404
        })
    if (userId) {
        const user = await User.findByPk(userId)
        if (!user)
            return response.status(404).json({
                status: "User not found",
                message: "No user found with that ID",
                statusCode: 404
            })
    }
    const addUserToOrg = await UserOrganisation.create({ userId, orgId })
    if (!addUserToOrg) 
        return response.status(400).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 400
        })
    response.status(201).json({
        status: "success",
        message: "User added to organisation successfully",
    })
})

module.exports = {createOrganization, getOrganization, getAllOrganization, addUserToOrganisation}
