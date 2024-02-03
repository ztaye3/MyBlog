import {toast} from "react-toastify";
import axios from "axios"
import {
    LOGIN_AS_ADMIN_FAIL, LOGIN_AS_ADMIN_SUCCESS,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS,
    SET_CURRENT_USER,
    SET_TOKEN,
    UNSET_CURRENT_USER,
    VERIFY_TOKEN_FAIL,
    VERIFY_TOKEN_SUCCESS
} from "./loginType";
import {setAxiosTokenAuthHeader, errorFilter, isEmptyUtils, unsetLocalStorage} from "../../utils/Utils";
import { push } from "connected-react-router";
import {
    GET_USER_URL,
    LOGIN_URL,
    REFRESH_TOKEN_URL,
    RESET_PASSWORD_CONFIRM_URL,
    RESET_PASSWORD_URL,
    VERIFY_TOKEN_URL
} from "../../utils/Constant";



// Login user
export const loginUserAction = (userInput, redirectTo) =>{
    return function (dispatch){
        axios
            .post(LOGIN_URL, userInput)
            .then(response => {

                const {access, refresh} = response.data;

                // Set token header
                setAxiosTokenAuthHeader(access)

                // Set token
                dispatch(setToken(access, refresh))


                // Verify token
                dispatch(verifyToken(access))

                // Get user details
                dispatch(getCurrentUser(redirectTo))


            } )
            .catch(error => {
                // Unset current user
                dispatch(unsetCurrentUser(error))
            });
    };
}

// Token setter
export const setToken = (access, refresh) =>{
    return function(dispatch){

                // Save token for re use during refresh
                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);

                // Call set_token action, pass token
                dispatch({
                   type: SET_TOKEN,
                   info: 'Token received',
                   access: access,
                    refresh: refresh
                 })
    }
}

// Get user detail after successfully login
export const getCurrentUser = (redirect) => {

    return function (dispatch){

        axios
            .get(GET_USER_URL)
            .then(response => {

                const user = response.data;

                // Set current user
                dispatch(setCurrentUser(user, redirect))
            })
            .catch(error => {
                // Unset current user
                dispatch(unsetCurrentUser(error))
            })
    }
}

// Current user setter
export const setCurrentUser = (user, redirect) => {
    return function (dispatch){

                // Store user in local storage
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({
                    type: SET_CURRENT_USER,
                    info: 'Current user sated',
                    payload: user
                })

                // Redirect to dashboard page
                if (!isEmptyUtils(redirect)) {
                dispatch(push(redirect));
                }
    }
}

// Current user un setter
const unsetCurrentUser = error =>{
    return function(dispatch){

        unsetLocalStorage();

        dispatch({
                    type: UNSET_CURRENT_USER,
                    info: 'Error in login',
                    errorData: error.response.data
                })

                // Propagate error
                errorFilter(error)
    }


}

// Verify token/access
export const verifyToken = (access) => dispatch => {

    const auth_token = {token: access};

    axios.post(VERIFY_TOKEN_URL, auth_token)
        .then(response => {
            dispatch({
                type: VERIFY_TOKEN_SUCCESS,
                info: "Verify token success"
            })
        })
        .catch(error => {
            dispatch({
                type: VERIFY_TOKEN_FAIL
            })
        })
}

// Refresh token/access
export const refreshToken = (refresh_token) => dispatch => {
    axios.post(REFRESH_TOKEN_URL, refresh_token)
        .then(response => {
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                info: "Verify token success"
            })
        })
        .catch(error => {
            dispatch({
                type: REFRESH_TOKEN_FAIL
            })
        })
}

// Reset Password
export const resetPassword = (email) => dispatch => {

    const email_address = {email: email};

    axios.post(RESET_PASSWORD_URL, email_address)
        .then(response => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                info: "Reset password success"
            })

        })
        .catch(error => {
            dispatch({
                type: RESET_PASSWORD_FAIL
            })
        })
}

// Reset Password Confirm
export const resetPasswordConfirm = (userInput) => dispatch => {
    axios.post(RESET_PASSWORD_CONFIRM_URL, userInput)
        .then(response => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                info: "Reset password success"
            })

            dispatch(push("/login"))
        })
        .catch(error => {
            dispatch({
                type: RESET_PASSWORD_FAIL
            })
        })
}

// Activate admin mode
export const adminModeController = (redirectTo) => dispatch =>{
    dispatch({
        type: LOGIN_AS_ADMIN_SUCCESS
    })

    dispatch(push(redirectTo))
}

export default loginUserAction;