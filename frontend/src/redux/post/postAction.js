import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter} from "../../utils/Utils";
import {
    ADD_POST, BLOG_POST_FRONTEND_URL,
    DELETE_POST,
    GET_POST, GET_POST_DETAIL, GET_SINGLE_POST_DETAIL,
    POST_ADD_URL, POST_GET_DETAIL_URL,
    POST_GET_URL, POST_LIKE_ADD_URL, SEARCH_POST, SEARCH_POST_URL,
    UPDATE_POST, UPDATE_POST_LIKE
} from "../../utils/Constant";
import {
    ADD_POST_FAIL,
    ADD_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    GET_ALL_POST_DETAIL_FAIL,
    GET_ALL_POST_DETAIL_SUCCESS,
    GET_ALL_POST_FAIL,
    GET_ALL_POST_SUCCESS, GET_POST_DETAIL_FAIL, GET_POST_DETAIL_SUCCESS,
    UPDATE_POST_FAIL, UPDATE_POST_LIKE_FAIL, UPDATE_POST_LIKE_SUCCESS,
    UPDATE_POST_SUCCESS
} from "./type";
import {NO_DISPATCH} from "../../utils/Constant";
import {SET_POST, SET_POSTS, SET_SEARCH_POSTS} from "../actions/actions";
import {GET_ALL_POST_BY_CATEGORY_FAIL, SEARCH_POST_FAIL} from "../admin/category/type";


const postAction = (userInput, operation, redirectTo) => dispatch => {


    if (operation === ADD_POST)
        dispatch(addPost(userInput, redirectTo))
    else if (operation === DELETE_POST)
        dispatch(removePost(userInput, redirectTo))
    else if (operation === UPDATE_POST)
        dispatch(updatePost(userInput, redirectTo))
    else if (operation === GET_POST)
        dispatch(getAllPost(redirectTo))
    else if (operation === GET_POST_DETAIL)
        dispatch(getAllPostDetail(redirectTo))
    else if (operation === GET_SINGLE_POST_DETAIL)
        dispatch(getPost(userInput, redirectTo))
    else if (operation === UPDATE_POST_LIKE)
        dispatch(updatePostLike(userInput, redirectTo))
    else if (operation === SEARCH_POST)
        dispatch(searchPost(userInput, redirectTo))



}

// Get all post by category
const searchPost = (userInput, redirectTo) => dispatch =>{

    const key = userInput['key']

          axios
        .get(SEARCH_POST_URL + key + '/')
        .then(result => {
            const posts =result.data;

            const searchPosts = {
                searchValue: key, posts: posts
            }


             dispatch({type: SET_SEARCH_POSTS,
                        searchPosts: searchPosts}
                       )
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: SEARCH_POST_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Get all post 
const getAllPost = (redirectTo) => dispatch =>{

    axios
        .get(POST_GET_URL)
        .then(result => {
             dispatch({type: GET_ALL_POST_SUCCESS,
                       payload: result.data})
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_POST_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}
         
// Get all post 
const getAllPostDetail = (redirectTo) => dispatch =>{

    axios
        .get(POST_GET_DETAIL_URL)
        .then(result => {
             dispatch({type: GET_ALL_POST_DETAIL_SUCCESS,
                       payload: result.data})
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_POST_DETAIL_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Add post 
const addPost = (userInput, redirectTo) => dispatch => {

        const postInput = userInput[2];

        const formData = new FormData();

        formData.append("title", postInput.title);
        formData.append("excerpt", postInput.excerpt);
        formData.append("content", postInput.content);
        formData.append("status", postInput.status);
        formData.append("image", postInput.image);
        formData.append("created_by", userInput[0]);
        formData.append("category", userInput[1]);

        axios
        .post(POST_ADD_URL, formData)
        .then(response => {
             dispatch({type: ADD_POST_SUCCESS})
               toast.success(
                      " added successfully!"
                  )
             dispatch(getAllPost())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_POST_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove post  by id
const removePost = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(POST_GET_URL + id + "/")
        .then(result => {

             toast.success(
                      " removed successfully!"
                  )
             dispatch({type: DELETE_POST_SUCCESS
                       })
             dispatch(getAllPost())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_POST_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update post  by id
const updatePost = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    const formData = new FormData();
    formData.append("id", userInput.id);
    formData.append("title", userInput.title);
        formData.append("excerpt", userInput.excerpt);
        formData.append("content", userInput.content);
        formData.append("status", userInput.status);

    axios
        .put(POST_GET_URL + id + "/", formData)
        .then(result => {

             toast.success(
                      " updated successfully!"
                  )
             dispatch({type: UPDATE_POST_SUCCESS
                       })

             dispatch(getAllPost())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_POST_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

/**
 * get single post details
 * @param userInput
 * @param redirectTo
 * @returns {(function(*): void)|*}
 */
const getPost = (userInput, redirectTo) => dispatch => {

    let slug = userInput.slug

    axios
        .get(POST_GET_URL + slug + "/")
        .then(result => {

            dispatch({
                type: GET_POST_DETAIL_SUCCESS
            })
            dispatch({
                type: SET_POST,
                post: result.data[0]
            })
            // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH) {
                dispatch(push(redirectTo))
            }
        })
        .catch(error => {
            dispatch({type: GET_POST_DETAIL_FAIL})
            errorFilter(error)
            // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH) {
                dispatch(push(redirectTo))
            }
        })
}

// Update post  like
const updatePostLike = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id


    axios
        .put(POST_LIKE_ADD_URL + id + "/", userInput)
        .then(result => {


             dispatch({type: UPDATE_POST_LIKE_SUCCESS
                       })

             window.location.href = redirectTo;

        })
        .catch(error => {
             dispatch({type: UPDATE_POST_LIKE_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}



export default postAction;