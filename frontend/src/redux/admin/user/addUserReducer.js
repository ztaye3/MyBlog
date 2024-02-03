import {CREATE_USER_SUBMIT, CREATE_USER_SUCCESS, CREATE_USER_ERROR} from "../../signup/signupType";
import {isEmptyUtils} from "../../../utils/Utils";
import {
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    GET_ALL_USER_SUCCESS, UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS
} from "./type";

const initialState = {
    passwordError: "",
    isSubmitted: false,
    emailError: "",
    re_passwordError: "",
    first_nameError: "",
    last_nameError: "",
    users : []
}

// Signup reducer
const addUserReducer = (state = initialState, action) =>{
    switch (action.type){
        case CREATE_USER_SUBMIT:
            return {

                passwordError: "",
                isSubmitted: true,
                emailError: "",
                re_passwordError: "",
                first_nameError: "",
                last_nameError: ""
            }
        case CREATE_USER_ERROR:

            if(!isEmptyUtils(action.errorData)){

             if (action.errorData.hasOwnProperty("password")){
                state.passwordError = action.errorData["password"]
            }

             if (action.errorData.hasOwnProperty("email")){
                state.emailError = action.errorData["email"]
            }
                        if (action.errorData.hasOwnProperty("re_password")){
                state.re_passwordError = action.errorData["re_password"]
            }

             if (action.errorData.hasOwnProperty("first_name")){
                state.first_nameError = action.errorData["first_name"]
            }

             if (action.errorData.hasOwnProperty("last_name")){
                state.last_nameError = action.errorData["last_name"]
            }
            }
             return {
                 ...state,
                 passwordError: state.passwordError,
                 emailError: state.emailError,
                 re_passwordError: state.re_passwordError,
                 first_nameError: state.first_nameError,
                 last_nameError: state.last_nameError,
                 isSubmitted: false
            }

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                passwordError: "",
                emailError: "",
                re_passwordError: "",
                first_nameError: "",
                last_nameError: "",
                isSubmitted: true
            }
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case GET_ALL_USER_FAIL:
            return {
                ...state
            }
        case DELETE_USER_FAIL:
        case DELETE_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case UPDATE_USER_FAIL:    
        default:
            return state;
    }
}

export default addUserReducer;