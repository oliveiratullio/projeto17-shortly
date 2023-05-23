import Joi from "joi"

export const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required().min(3),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required().min(3),
})