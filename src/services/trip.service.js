import APIServices from "./api.services";
import ServiceUrls from "./service.url";
import AuthUtil from "../utils/auth.util";

class TripService {
    static async getTrips(data) {

        return APIServices.get({
            url: ServiceUrls.getTripsUrl,
            queryParams: data,
            headers: AuthUtil.getHeaders(),
        });
    }


    static async getNextMonthTrips(data) {

        return APIServices.get({
            url: ServiceUrls.nextMonthTripsUrl,
            queryParams: data.page,
            headers: AuthUtil.getHeaders(),
        });
    }

    static async deleteTrip(tripId) {
        return APIServices.delete({
            url: `${ServiceUrls.deleteTripUrl}${tripId}`,
            headers: AuthUtil.getHeaders(),
        });
    }

    static async getTrip(tripId) {
        return APIServices.get({
            url: `${ServiceUrls.updateTripUrl}${tripId}`,
            headers: AuthUtil.getHeaders(),
        });
    }


    static async addTrip(body) {
        return APIServices.post({
            url: ServiceUrls.addTripUrl,
            headers: AuthUtil.getHeaders(),
            data: body,
        });
    }

    static async updateTrip(tripId, body) {
        return APIServices.put({
            url: `${ServiceUrls.updateTripUrl}${tripId}`,
            headers: AuthUtil.getHeaders(),
            data: body,
        });
    }

}

export default TripService;
