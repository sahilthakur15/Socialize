import Joi from "joi";

const registerValidation = (data : any) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(20).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp('[a-z]'), 'at least one lowercase letter')
        .pattern(new RegExp('[A-Z]'), 'at least one uppercase letter')
        .pattern(new RegExp('[0-9]'), 'at least one number')
        .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]'), 'at least one special character')
    })
    return schema.validate(data);
}
 
const loginValidation = (data : any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp('[a-z]'), 'at least one lowercase letter')
        .pattern(new RegExp('[A-Z]'), 'at least one uppercase letter')
        .pattern(new RegExp('[0-9]'), 'at least one number')
        .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]'), 'at least one special character')
    })
    return schema.validate(data);
}

export {
    registerValidation,
    loginValidation
}