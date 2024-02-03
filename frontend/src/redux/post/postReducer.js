import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter} from "../../utils/Utils";
import {
    ADD_POST,
    DELETE_POST,
    GET_POST, GET_POST_DETAIL,
    POST_ADD_URL, POST_GET_DETAIL_URL,
    POST_GET_URL,
    UPDATE_POST
} from "../../utils/Constant";
import {
    ADD_POST_FAIL,
    ADD_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_SUCCESS, GET_ALL_POST_DETAIL_FAIL, GET_ALL_POST_DETAIL_SUCCESS,
    GET_ALL_POST_FAIL,
    GET_ALL_POST_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_SUCCESS
} from "./type";
import {NO_DISPATCH} from "../../utils/Constant";



const initialState = {
    post: [],
    postDetail: [],
    postAdded: false
}

const postReducer = (state =initialState, action) => {
        switch (action.type){
            case ADD_POST_SUCCESS:
            return {
                ...state,
                productAdded: true
            }
            case GET_ALL_POST_SUCCESS:
                return {
                    ...state,
                    post: action.payload
                }
            case GET_ALL_POST_DETAIL_SUCCESS:
                return {
                    ...state,
                    postDetail: action.payload
                }
            default:
                return state
        }
}
export default postReducer;