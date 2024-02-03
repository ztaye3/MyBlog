import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter} from "../../../utils/Utils";
import {
    ADD_CV_SUCCESS,
    ADD_CV_FAIL,
    GET_ALL_CV_SUCCESS,
    GET_ALL_CV_FAIL,
    DELETE_CV_SUCCESS,
    DELETE_CV_FAIL,
    UPDATE_CV_SUCCESS,
    UPDATE_CV_FAIL,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAIL,
    GET_ALL_PROJECT_SUCCESS,
    GET_ALL_PROJECT_FAIL,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAIL,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,
    ADD_ABOUT_SUCCESS,
    ADD_ABOUT_FAIL,
    GET_ALL_ABOUT_SUCCESS,
    GET_ALL_ABOUT_FAIL,
    DELETE_ABOUT_SUCCESS,
    DELETE_ABOUT_FAIL,
    UPDATE_ABOUT_SUCCESS,
    UPDATE_ABOUT_FAIL,
    SET_CURRENT_CV_SUCCESS, SEND_CONTACT_EMAIL_SUCCESS
} from "./type";

import {NO_DISPATCH} from "../../../utils/Constant";

const initialState = {
    cv: [],
    about: [],
    project: [],
    current_cv: "",
    send_email: false
}

const personalReducer = (state =initialState, action) => {
        switch (action.type){
            case ADD_CV_SUCCESS:
            return {
                ...state,
            }
            case SEND_CONTACT_EMAIL_SUCCESS:
            return {
                ...state,
                send_email: true
            }

            case GET_ALL_CV_SUCCESS:
                return {
                    ...state,
                    cv: action.payload
                }
                case ADD_PROJECT_SUCCESS:
            return {
                ...state,
            }
            case GET_ALL_PROJECT_SUCCESS:
                return {
                    ...state,
                    project: action.payload
                }
                case ADD_ABOUT_SUCCESS:
            return {
                ...state,
            }

            case SET_CURRENT_CV_SUCCESS:
                return {
                    ...state,
                    current_cv: action.payload
                }

            case GET_ALL_ABOUT_SUCCESS:
                return {
                    ...state,
                    about: action.payload
                }

                default:
                return state
        }
}
export default personalReducer;