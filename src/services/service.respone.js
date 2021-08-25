class ServiceResponse {
    static success(data, message = "Successfull", httpCode = 200) {
        return new ServiceResponse(data, message, httpCode);
    }

    static error(message = "Network error", httpCode = 500) {
        return new ServiceResponse(undefined, message, httpCode);
    }

    constructor(data = "", message = "", httpCode = 0) {
        this.data = data;
        this.message = message;
        this.httpCode = httpCode;
        this.success = !!data || httpCode < 400;
    }
}

export default ServiceResponse;
