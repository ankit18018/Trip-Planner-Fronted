import ServiceResponse from "./service.respone";
import Axios from "axios";
import AwaitTo from "async-await-error-handling";
export default class ApiServices {
    static async get({ url = "", queryParams = {}, headers = {} }) {
        const config = {
            params: queryParams,
            headers,
        };
        const [err, response] = await AwaitTo(Axios.get(url, config));
        if (err) {
            if (err.response) {
                return ServiceResponse.error(
                    err.response.data.message,
                    err.response.status
                );
            } else {
                return ServiceResponse.error(err);
            }
        }
        return ServiceResponse.success(response.data.data, response.data.message);
    }

    static async post({ url = "", queryParams = {}, data = {}, headers = {} }) {
        const config = {
            params: queryParams,
            headers,
        };

        const [err, response] = await AwaitTo(Axios.post(url, data, config));

        if (err) {
            if (err.response) {
                return ServiceResponse.error(
                    err.response.data.message,
                    err.response.status
                );
            } else {
                return ServiceResponse.error(err);
            }
        }
        return ServiceResponse.success(response.data.data, response.data.message);
    }

    static async delete({ url = "", queryParams = {}, headers = {}, data = {} }) {
        const config = {
            params: queryParams,
            headers,
            data,
        };


        const [err, response] = await AwaitTo(Axios.delete(url, config));
        if (err) {
            if (err.response) {
                return ServiceResponse.error(
                    err.response.data.message,
                    err.response.status
                );
            } else {
                return ServiceResponse.error(err);
            }
        }
        return ServiceResponse.success(response.data.data, response.data.message);
    }

    static async put({ url = "", queryParams = {}, data = {}, headers = {} }) {
        const config = {
            params: queryParams,
            headers,
        };

        const [err, response] = await AwaitTo(Axios.put(url, data, config));
        if (err) {
            if (err.response) {
                return ServiceResponse.error(
                    err.response.data.message,
                    err.response.status
                );
            } else {
                return ServiceResponse.error(err);
            }
        }
        return ServiceResponse.success(response.data.data, response.data.message);
    }
}
