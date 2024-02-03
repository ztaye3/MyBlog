import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter, isEmptyUtils} from "../../../utils/Utils";
import {
    ADD_POST_CATEGORY,
    DELETE_POST_CATEGORY, GET_POST_BY_CATEGORY, GET_POST_BY_CATEGORY_URL,
    GET_POST_CATEGORY,
    POST_CATEGORY_ADD_URL,
    POST_CATEGORY_GET_URL,
    UPDATE_POST_CATEGORY
} from "../../../utils/Constant";
import {
    ADD_POST_CATEGORY_FAIL,
    ADD_POST_CATEGORY_SUCCESS, DELETE_POST_CATEGORY_FAIL, DELETE_POST_CATEGORY_SUCCESS, GET_ALL_POST_BY_CATEGORY_FAIL,
    GET_ALL_POST_CATEGORY_FAIL,
    GET_ALL_POST_CATEGORY_SUCCESS, UPDATE_POST_CATEGORY_FAIL, UPDATE_POST_CATEGORY_SUCCESS
} from "./type";
import {NO_DISPATCH} from "../../../utils/Constant";
import {SET_POSTS} from "../../actions/actions";

const postCategoryAction = (userInput, operation, redirectTo) => dispatch => {


    if (operation === ADD_POST_CATEGORY)
        dispatch(addPostCategory(userInput, redirectTo))
    else if (operation === DELETE_POST_CATEGORY)
        dispatch(removePostCategory(userInput, redirectTo))
    else if (operation === UPDATE_POST_CATEGORY)
        dispatch(updatePostCategory(userInput, redirectTo))
    else if (operation === GET_POST_CATEGORY)
        dispatch(getAllPostCategory(userInput, redirectTo))
    else if (operation === GET_POST_BY_CATEGORY)
        dispatch(getAllPostByCategory(userInput, redirectTo))
}

// Get all post by category
const getAllPostByCategory = (userInput, redirectTo) => dispatch =>{

    const id = userInput['id']

          axios
        .get(GET_POST_BY_CATEGORY_URL + id + '/')
        .then(result => {
            const posts =result.data;

             dispatch({type: SET_POSTS,
                       posts: posts})
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_POST_BY_CATEGORY_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Get all post category type
const getAllPostCategory = (userInput, redirectTo) => dispatch =>{
    axios
        .get(POST_CATEGORY_GET_URL)
        .then(result => {
             dispatch({type: GET_ALL_POST_CATEGORY_SUCCESS,
                       payload: result.data})

            if (!isEmptyUtils(userInput)){
                    const input = {id:result.data[0].id}
                    dispatch(getAllPostByCategory(input, NO_DISPATCH))
                }
             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_POST_CATEGORY_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}



// Add post category type
const addPostCategory = (userInput, redirectTo) => dispatch => {

        axios
        .post(POST_CATEGORY_ADD_URL, userInput)
        .then(response => {
             dispatch({type: ADD_POST_CATEGORY_SUCCESS})
               toast.success(
                      "Category added successfully!"
                  )
             dispatch(getAllPostCategory())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_POST_CATEGORY_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove post category type by id
const removePostCategory = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(POST_CATEGORY_GET_URL + id + "/")
        .then(result => {

             toast.success(
                      "Category removed successfully!"
                  )
             dispatch({type: DELETE_POST_CATEGORY_SUCCESS
                       })
             dispatch(getAllPostCategory())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_POST_CATEGORY_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update post category type by id
const updatePostCategory = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id


    axios
        .put(POST_CATEGORY_GET_URL + id + "/", userInput)
        .then(result => {

             toast.success(
                      "Category updated successfully!"
                  )
             dispatch({type: UPDATE_POST_CATEGORY_SUCCESS
                       })

             dispatch(getAllPostCategory())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_POST_CATEGORY_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}


export default postCategoryAction;