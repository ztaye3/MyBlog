import {
    SET_TOKEN,
    SET_CURRENT_USER,
    UNSET_CURRENT_USER,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAIL,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL, LOGIN_AS_ADMIN_FAIL, LOGIN_AS_ADMIN_SUCCESS
} from "./loginType";
import {isEmptyUtils} from "../../utils/Utils";

const initialState = {
    user: {
    },
    access: "",
    refresh: "",
    isAuthenticated: false,
    emailError: "",
    passwordError: "",
    isResetPasswordRequestSent: false,
    loginAsAdmin: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_TOKEN:
            return  {
                ...state,
                isAuthenticated: true,
                access: action.access,
                refresh: action.refresh
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            }
        case REFRESH_TOKEN_SUCCESS:
            return {
                 ...state,
                isAuthenticated: true,
                access: action.access,
            }
        case REFRESH_TOKEN_FAIL:
            return {
                ...state
            }
          case VERIFY_TOKEN_SUCCESS:
            return {
                 ...state,
                isAuthenticated: true,
            }
        case VERIFY_TOKEN_FAIL:
            return {
                 initialState
            }
        case UNSET_CURRENT_USER:

            // Check if the action is is 'loginAction'
           if(!isEmptyUtils(action.errorData)){

                if (action.errorData.hasOwnProperty("email")){
                state.emailError = action.errorData["email"]
            }

             if (action.errorData.hasOwnProperty("password")){
                state.passwordError = action.errorData["password"]
            }

           }
             return initialState;

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPasswordRequestSent: true
            }
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_CONFIRM_SUCCESS:
            return initialState;
        case RESET_PASSWORD_CONFIRM_FAIL:
        case LOGIN_AS_ADMIN_SUCCESS:
            return  {
                ...state,
                loginAsAdmin: !(state.loginAsAdmin)
            }
        case LOGIN_AS_ADMIN_FAIL:
            return  {
                ...state,
                loginAsAdmin: false
            }

        default:
            return state;
    }
}

export default loginReducer;