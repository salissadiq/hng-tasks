const Joi = require('joi');
const validateUser = (user) => {
    const schema = Joi.object({
        userId: Joi.number(),
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(50).email().required(),
        password: Joi.string().min(6).max(250).required(),
        phone: Joi.string().min(10).max(12)
    })

    return schema.validate(user);
}

const validateLoginUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(2).max(50).email().required(),
        password: Joi.string().min(6).max(250).required(),
    })

    return schema.validate(user);
}

const validateOrganisation = (org) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(6).max(250),
    })

    return schema.validate(org);
}


const fieldValidationHandler = (errorMessage) =>{
    const cleanedMessage = errorMessage.message.replace(/["\\]/g, '');
    
    return {
        errors: errorMessage.path.map(field => ({
            field: field,
            message: cleanedMessage
        }))
    };
}

module.exports = {validateUser, fieldValidationHandler, validateLoginUser, validateOrganisation}