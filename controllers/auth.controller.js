const user = require("../db/models/user");
const organization = require("../db/models/organization");
const { validateUser, fieldValidationHandler } = require("../utils/fieldValidations")
const { encryptPassword } = require("../utils/hashPassword");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async(request, response, next) => {
    const body  = request.body
    const { error, value } = validateUser(body);
    if (error) return response.status(422).json(fieldValidationHandler(error.details[0]))
    const hashedPasssword = await encryptPassword(body.password)
    
    const newUser = await user.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPasssword,
        phone: body.phone
    }).then((data) => {
        const newOrg = organization.create({
            name: `${data.firstName}'s Organization`
        })
         if(!newOrg) return response.status(400).json({
        status: "Bad request",
        message: "Registration unsuccessful",
        statusCode: 400
    })
        const result = data.toJSON()
        delete result.password
        response.status(201).json({
        status: "success",
        message: "Registration successful",
        data: {
        accessToken: "eyJh...",
        user: result
        }
})
    })
   
    
})

const login = async(request, response, next) => {
    response.json({
        message: "Login success"
    })
}

module.exports = {register, login}