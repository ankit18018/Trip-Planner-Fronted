import UserService from "../services/user.service";

class AuthUtil {
    static jwtToken = "" || null;

    static getHeaders() {
        return {
            jwttoken: this.getJWTToken(),
        };
    }

    static getJWTToken() {
        return this.jwtToken || localStorage.getItem("jwtToken");
    }
    static clearJWTToken() {
        this.jwtToken = null;
        localStorage.removeItem("jwtToken");
        this.currentUser = null;
    }

    static  setJWTToken(jwtToken) {
        this.jwtToken = jwtToken;
        localStorage.setItem("jwtToken", jwtToken);

    }

    static async getCurrentUser() {
        const res = await UserService.getCurrentUser();
        if (!res.success) {
            //set toasts msg "unable to get CurrentUser"
            return;
        }
        return res.data.authUser;
    }
}

export default AuthUtil;
