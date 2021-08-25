import * as Joi from "joi-browser";
import {tripCreateSchema, tripFilterSchema, tripUpdateSchema} from "./joi-schema/trip.joi-schema";

class TripValidator {
    static validateTripFilter(data) {
        const res = Joi.validate(data, tripFilterSchema);
        return res;
    }

    static validateCreateTrip(data) {
        const res = Joi.validate(data, tripCreateSchema);
        return res;
    }
    static validateUpdateTrip(data) {
        const res = Joi.validate(data,tripUpdateSchema );
        return res;
    }
}

export default TripValidator;
