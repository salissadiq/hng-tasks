require("dotenv").config({path: `${process.cwd()}/.env`})
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const { validateUser, fieldValidationHandler, validateLoginUser } = require("../utils/fieldValidations")
const catchAsync = require("../utils/catchAsync");

const {sequelize, User, Organisation, UserOrganisation} = require("../db/models")

const register = catchAsync(
    async (request, response) => {
         const { error, value } = validateUser(request.body);
        if (error) return response.status(422).json(fieldValidationHandler(error.details[0]))
        const transaction = await sequelize.transaction();
    
        const { firstName, lastName, email, password } = request.body;
       
        
        const user = await User.create({ firstName, lastName, email, password }, { transaction });
        
        // Make sure the organisation name contains only 's
        const organisationName = `${firstName}'s Organisation`;

        const organisation = await Organisation.create({ name: organisationName }, {transaction});
        await UserOrganisation.create({ userId: user.userId, orgId: organisation.orgId }, { transaction })
         await transaction.commit();
        const token = await jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        const result = user.toJSON()
        delete result.password
        delete result.createdAt
        delete result.updatedAt
        response.set('authorization', token)
        response.status(201).json({
            status: "success",
            message: "Registration successful",
            data: {
                accessToken: token,
                user: result
            }
        });
    })

const login = catchAsync(async (request, response) => {
    const { email, password } = request.body;
    const { error } = validateLoginUser(request.body);
    if (error) return response.status(422).json(fieldValidationHandler(error.details[0]))
    const user = await User.findOne({ where: { email } });
    
     if (!user) {
      return response.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401
    });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return response.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401
    });
    }
    const token = await jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
     const result = user.toJSON()
        delete result.password
        delete result.createdAt
    delete result.updatedAt
    response.set('authorization', token)
      response.json({
        status: "success",
        message: "Login successful",
        data: {
        accessToken: token,
            user: result
          }
      });

})

module.exports = {register, login}