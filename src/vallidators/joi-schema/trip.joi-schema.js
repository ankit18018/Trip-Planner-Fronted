import * as Joi from "joi-full";
import {GenConst} from "../../constants/constants";


export const tripFilterSchema = Joi.object({
    min_start_date: Joi.date()
        .format('YYYY-MM-DD')
        .min(GenConst.startDate)
        .max(GenConst.endDate),


    max_start_date: Joi.date()
        .format('YYYY-MM-DD')
        .min(GenConst.startDate)
        .max(GenConst.endDate),

    min_end_date: Joi.date()
        .format('YYYY-MM-DD')
        .min(GenConst.startDate)
        .max(GenConst.endDate),

    max_end_date: Joi.date()
        .format('YYYY-MM-DD')
        .min(GenConst.startDate)
        .max(GenConst.endDate),

    page: Joi.number().default(1),

    own_trips: Joi.boolean().default(false),

    destination:Joi.string().allow(null, ''),

    next_month_plan:Joi.boolean().default(false),
});
export const tripCreateSchema = Joi.object({
    destination: Joi.string().min(3).required(),

    startDate: Joi.date()
        .format('YYYY-MM-DD')
        .min(GenConst.startDate)
        .max(GenConst.endDate)
        .required(),

    endDate: Joi.date()
        .format('YYYY-MM-DD')
        .min(Joi.ref("startDate"))
        .max(GenConst.endDate)
        .required(),
    comment: Joi.string().allow(null, '').min(10),
});


export const tripUpdateSchema = Joi.object({
    destination: Joi.string().min(3),

    startDate: Joi.date()
        .format('YYYY-MM-DD')
        .min(GenConst.startDate)
        .max(GenConst.endDate),

    endDate: Joi.date().format('YYYY-MM-DD').min(Joi.ref("startDate"),GenConst.startDate).max(GenConst.endDate),
    comment: Joi.string().allow(null, '').min(10),
});
