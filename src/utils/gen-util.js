import {toast} from "react-toastify";
import moment from "moment";
export default class GenUtil {

    static toastError(err) {
        toast.error(err, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            toastId: err
        });
    }

    static toastMessage(msg) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
        })
    }

    static formatDateToStr(date) {
        return moment(date).format('YYYY-MM-DD')
    }
}