import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter} from "../../utils/Utils";
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_COMMENT,
    COMMENT_COMMENT_GET_URL,
    COMMENT_COMMENT_ADD_URL,
    UPDATE_COMMENT
} from "../../utils/Constant";
import {
    ADD_COMMENT_FAIL,
    ADD_COMMENT_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_SUCCESS,
    GET_ALL_COMMENT_FAIL,
    GET_ALL_COMMENT_SUCCESS, GET_POST_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL, UPDATE_COMMENT_SUCCESS
} from "./type";
import {NO_DISPATCH} from "../../utils/Constant";

const initialState = {
    allComments: [],
    postComment: [],
    commentAdded: false
}

const commentReducer = (state =initialState, action) => {
        switch (action.type){
            case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                productAdded: true
            }
            case GET_ALL_COMMENT_SUCCESS:
                return {
                    ...state,
                    allComments: action.payload
                }
            case GET_POST_COMMENT_SUCCESS:
                return {
                    ...state,
                    postComment: action.payload
                }
            default:
                return state
        }
}
export default commentReducer;