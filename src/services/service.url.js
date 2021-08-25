class ServiceUrls {
  static basePath = `https://trip-backend1.herokuapp.com`;
  static loginUrl = `${ServiceUrls.basePath}/api/v1/user/login`;
  static logOutUrl = `${ServiceUrls.basePath}/api/v1/user/logout`;
  static getCurrentUserUrl = `${ServiceUrls.basePath}/api/v1/user/current`;
  static getUsersUrl = `${ServiceUrls.basePath}/api/v1/user/`;
  static createUserUrl = `${ServiceUrls.basePath}/api/v1/user/signup`;
  static deleteUsersUrl = `${ServiceUrls.basePath}/api/v1/user/`;
  static updateUsersUrl = `${ServiceUrls.basePath}/api/v1/user/`;
  static createUserByAdminUrl = `${ServiceUrls.basePath}/api/v1/user/`;
  static getTripsUrl = `${ServiceUrls.basePath}/api/v1/trip/`;
  static nextMonthTripsUrl = `${ServiceUrls.basePath}/api/v1/trip/next_month_plan`;
  static deleteTripUrl = `${ServiceUrls.basePath}/api/v1/trip/`;
  static addTripUrl = `${ServiceUrls.basePath}/api/v1/trip/`;
  static updateTripUrl = `${ServiceUrls.basePath}/api/v1/trip/`;
}

export default ServiceUrls;
