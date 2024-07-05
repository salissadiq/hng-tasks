const Joi = require('joi');
const validateUser = (user) => {
    const schema = Joi.object({
        userId: Joi.number(),
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(50).email().required(),
        password: Joi.string().min(6).max(250).required()
    })

    return schema.validate(user);
}