import axios from "axios";
import {UNSET_CURRENT_USER} from "../login/loginType";
import { push } from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter, setAxiosTokenAuthHeader, unsetLocalStorage} from "../../utils/Utils";
import {HOME_URL, LOGOUT_URL} from "../../utils/Constant";


// Logout action
const logoutAction = () => dispatch => {

        unsetLocalStorage();

        dispatch({
            type: UNSET_CURRENT_USER
        })

        // Redirect to home
        dispatch(push(HOME_URL));

}

export default logoutAction;