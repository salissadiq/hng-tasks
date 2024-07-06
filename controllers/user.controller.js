const { sequelize, User, Organisation, UserOrganisation } = require("../db/models")
const catchAsync = require("../utils/catchAsync");

const getUser = async (request, response, next) => {
    const { id } = request.params
    let user;
    if (id !== null) {
        user = await User.findByPk(id)
    }
    if (!user) return response.status(404).send({
        status: "Not found",
        message: "No user found with that ID",
        statusCode: 404
    })

    const result = user.toJSON()
        delete result.password
        delete result.createdAt
        delete result.updatedAt
        response.json({
		status: "success",
        message: "Fetched User Record!",
        data:result 
})
    
}

module.exports = {getUser}