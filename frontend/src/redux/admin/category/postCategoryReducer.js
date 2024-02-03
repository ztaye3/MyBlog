import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter} from "../../../utils/Utils";
import {
    ADD_POST_CATEGORY,
    DELETE_POST_CATEGORY,
    GET_POST_CATEGORY,
    POST_CATEGORY_ADD_URL,
    POST_CATEGORY_GET_URL,
    UPDATE_POST_CATEGORY
} from "../../../utils/Constant";
import {
    ADD_POST_CATEGORY_FAIL,
    ADD_POST_CATEGORY_SUCCESS, DELETE_POST_CATEGORY_FAIL, DELETE_POST_CATEGORY_SUCCESS,
    GET_ALL_POST_CATEGORY_FAIL,
    GET_ALL_POST_CATEGORY_SUCCESS, UPDATE_POST_CATEGORY_FAIL, UPDATE_POST_CATEGORY_SUCCESS
} from "./type";
import {NO_DISPATCH} from "../../../utils/Constant";

const initialState = {
    postCategory: [
      // {
      //   id: 1,
      //   name: 'Technology'
      // },
      // {
      //   id: 2,
      //   name: 'Politics'
      // }
    ],
    postAdded: false
}

const postCategoryReducer = (state =initialState, action) => {
        switch (action.type){
            case ADD_POST_CATEGORY_SUCCESS:
            return {
                ...state,
                productAdded: true
            }
            case GET_ALL_POST_CATEGORY_SUCCESS:
                return {
                    ...state,
                    postCategory: action.payload
                }
            default:
                return state
        }
}
export default postCategoryReducer;