import APIServices from "./api.services";
import ServiceUrls from "./service.url";
import AuthUtil from "../utils/auth.util";
class UserService {
    static async login({ email = "", password = "" }) {
        return APIServices.post({
            url: ServiceUrls.loginUrl,
            data: { email, password },
        });
    }
    static async logout(jwttoken) {
        return APIServices.post({
            url: ServiceUrls.logOutUrl,
            headers:{jwttoken},
        });
    }
    static async getCurrentUser() {
        return APIServices.get({
            url: ServiceUrls.getCurrentUserUrl,
            headers: AuthUtil.getHeaders(),
        });
    }

    static async getUsers(page) {
        return APIServices.get({
            url: ServiceUrls.getUsersUrl,
            headers: AuthUtil.getHeaders(),
            queryParams: { page },
        });
    }

    static async getUser(userId) {
        return APIServices.get({
            url: `${ServiceUrls.updateUsersUrl}${userId}`,
            headers: AuthUtil.getHeaders(),
        });
    }

    static async createUser(user) {
        return APIServices.post({
            url: ServiceUrls.createUserUrl,
            data: user,
            headers: AuthUtil.getHeaders(),
        });
    }

    static async createUserByAdmin(user) {
        return APIServices.post({
            url: ServiceUrls.createUserByAdminUrl,
            data: user,
            headers: AuthUtil.getHeaders(),
        });
    }
    static async deleteUser(userId) {
        return APIServices.delete({
            url: `${ServiceUrls.deleteUsersUrl}${userId}`,
            headers: AuthUtil.getHeaders(),
        });
    }

    static async updateUser(user, userId) {
        return APIServices.put({
            url: `${ServiceUrls.updateUsersUrl}${userId}`,
            data: user,
            headers: AuthUtil.getHeaders(),
        });
    }
}

export default UserService;
