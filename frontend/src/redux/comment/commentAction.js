import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter} from "../../utils/Utils";
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_COMMENT,
    POST_COMMENT_GET_URL,
    POST_COMMENT_ADD_URL,
    UPDATE_COMMENT, GET_POST_COMMENT, BLOG_POST_FRONTEND_URL
} from "../../utils/Constant";
import {
    ADD_COMMENT_FAIL,
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    GET_ALL_COMMENT_FAIL,
    GET_ALL_COMMENT_SUCCESS,
    GET_POST_COMMENT_FAIL,
    GET_POST_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAIL,
    UPDATE_COMMENT_SUCCESS
} from "./type";
import {NO_DISPATCH} from "../../utils/Constant";

const commentAction = (userInput, operation, redirectTo) => dispatch => {

    if (operation === ADD_COMMENT)
        dispatch(addComment(userInput, redirectTo))
    else if (operation === DELETE_COMMENT)
        dispatch(removeComment(userInput, redirectTo))
    else if (operation === UPDATE_COMMENT)
        dispatch(updateComment(userInput, redirectTo))
    else if (operation === GET_COMMENT)
        dispatch(getAllComment(redirectTo))
    else if (operation === GET_POST_COMMENT)
        dispatch(getPostComment(userInput, redirectTo))


}
// Get all comment 
const getAllComment = (redirectTo) => dispatch =>{

    axios
        .get(POST_COMMENT_GET_URL)
        .then(result => {
             dispatch({type: GET_ALL_COMMENT_SUCCESS,
                       payload: result.data})
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_COMMENT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Get post comment
const getPostComment = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id
    axios
        .get(POST_COMMENT_GET_URL + id + "/")
        .then(result => {
             dispatch({type: GET_POST_COMMENT_SUCCESS,
                       payload: result.data})
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_POST_COMMENT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Add comment 
const addComment = (userInput, redirectTo) => dispatch => {

        axios
        .post(POST_COMMENT_ADD_URL, userInput)
        .then(response => {
             dispatch({type: ADD_COMMENT_SUCCESS})

            if (redirectTo === NO_DISPATCH){
                window.location.href = BLOG_POST_FRONTEND_URL + userInput.slug;
            }
        })
        .catch(error => {
             dispatch({type: ADD_COMMENT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove comment  by id
const removeComment = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(POST_COMMENT_GET_URL + id + "/")
        .then(result => {

             toast.success(
                      " removed successfully!"
                  )
             dispatch({type: DELETE_COMMENT_SUCCESS
                       })
             dispatch(getAllComment())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_COMMENT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update comment  by id
const updateComment = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id


    axios
        .put(POST_COMMENT_GET_URL + id + "/", userInput)
        .then(result => {

             toast.success(
                      " updated successfully!"
                  )
             dispatch({type: UPDATE_COMMENT_SUCCESS
                       })

             dispatch(getAllComment())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_COMMENT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}


export default commentAction;