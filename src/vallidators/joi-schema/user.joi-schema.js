import * as Joi from "joi-browser";

export const userSignUpSchema = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string().email().required(),

    role: Joi.string().valid('regular').required(),

    password: Joi.string().min(3).required(),
});
export const userSignUpAdminSchema = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(3).required(),
    role: Joi.string()
        .valid('regular', 'manager', 'admin' )
        .required(),

});


export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().min(3).required(),
});

export const userUpdateByAdminJoiSchema = Joi.object({
    name: Joi.string().min(3),

    email: Joi.string().email(),

    password: Joi.string().min(3),

    role: Joi.string().valid('regular', 'manager', 'admin'),
});
export const userUpdateByManagerJoiSchema = Joi.object({
    name: Joi.string().min(3),

    email: Joi.string().email(),

    password: Joi.string().min(3),

    role: Joi.string().valid('regular'),
});
