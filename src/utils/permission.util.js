import {UserRole} from "../constants/constants";

class PermissionUtil {
    static jwtToken = "" || null;

    static canDeleteUser(authUser, user) {
        if (authUser.role === UserRole.ADMIN) return true;
        if (
            authUser.role === UserRole.MANAGER &&
            user.role === UserRole.REGULAR
        )
            return true;
        return false;
    }

    static canUpdateUser(authUser, user) {
        if (authUser.role === 'admin') return true;
        if (
            authUser.role === UserRole.MANAGER &&
            user.role === UserRole.REGULAR
        )
            return true;
        return false;
    }

    static canUpdateTrip(currentUser, trip) {
        return currentUser.role === 'admin' || currentUser.id === trip.userId;
    }
}

export default PermissionUtil;
