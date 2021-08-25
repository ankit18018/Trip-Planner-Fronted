import * as Joi from "joi-browser";
import {
    userLoginSchema,
    userSignUpAdminSchema,
    userSignUpSchema,
    userUpdateByAdminJoiSchema,
    userUpdateByManagerJoiSchema,
} from "./joi-schema/user.joi-schema";

class UserValidator {
    static validateUser(data) {
        const res = Joi.validate(data, userLoginSchema);
        return res;
    }

    static validateUserManagerUpdateSchema(data) {
        const res = Joi.validate(data, userUpdateByManagerJoiSchema);
        return res;
    }
    static validateUserAdminUpdateSchema(data) {
        const res = Joi.validate(data, userUpdateByAdminJoiSchema);
        return res;
    }

    static validateUserCreateSchema(data) {
        const res = Joi.validate(data, userSignUpSchema);
        return res;
    }

    static validateUserByAdminCreateSchema(data) {
        const res = Joi.validate(data, userSignUpAdminSchema);
        return res;
    }
}

export default UserValidator;
