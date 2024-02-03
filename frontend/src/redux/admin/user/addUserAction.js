import axios from "axios";
import {ADD_USER_URL, GET_USER_URL, SIGNUP_URL, USER_PROFILE_URL, USER_URL} from "../../../utils/Constant";
import {push} from "connected-react-router";

import {toast} from "react-toastify";
import {errorFilter, isEmptyUtils} from "../../../utils/Utils";
import {CREATE_USER_ERROR, CREATE_USER_SUCCESS} from "../../signup/signupType";
import {
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    GET_ALL_USER_SUCCESS, UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS
} from "./type";
import {SET_CURRENT_USER} from "../../login/loginType";

const addUserAction = (userInput, operation) => dispatch => {

           if( operation === "addUser")
            dispatch(addUser(userInput))
        else if( operation === "deleteUser")
            dispatch(removeUser(userInput))
        else if( operation === "editUser")
            dispatch(updateUser(userInput))
        else if( operation === "getAllUser")
            dispatch(getAllUser())
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

    }
}

// Add User
const addUser = userInput => dispatch => {


     const formData = new FormData();

        formData.append("email", userInput.email);
        formData.append("password", userInput.password);
        formData.append("re_password", userInput.re_password);
        formData.append("first_name", userInput.first_name);
        formData.append("last_name", userInput.last_name);
        formData.append("is_admin", userInput.is_admin);
        formData.append("updated_by", userInput.updated_by);
        formData.append("is_staff", userInput.is_staff);
        formData.append("is_activated", userInput.is_activated);
        formData.append("profile_picture", userInput.profile_picture);
        formData.append("created_by", userInput.created_by);

        axios
        .post(SIGNUP_URL, formData)
        .then(response => {
             dispatch({type: CREATE_USER_SUCCESS})
               toast.success(
                      "User added successfully!"
                  )
             dispatch(getAllUser())
             dispatch(push("/manageUser"))
        })
        .catch(error => {
             errorFilter(error)
             dispatch({type: CREATE_USER_ERROR,
                       errorData: error.response.data})
        })

}

// Get all user
const getAllUser = () => dispatch =>{

    axios
        .get(USER_URL)
        .then(result => {
             dispatch({type: GET_ALL_USER_SUCCESS,
                       payload: result.data})

             dispatch(push("/manageUser"))
        })
        .catch(error => {
             dispatch({type: GET_ALL_USER_FAIL})
             errorFilter(error)
             dispatch(push("/manageUser"))
        })
}

// Remove USER by id
const removeUser = (userInput) => dispatch =>{

    let id = userInput.id

    axios
        .delete(USER_URL + id + "/")
        .then(result => {

             toast.success(
                      "USER removed successfully!"
                  )
             dispatch({type: DELETE_USER_SUCCESS
                       })
             dispatch(getAllUser())
             dispatch(push("/manageUser"))
        })
        .catch(error => {
             dispatch({type: DELETE_USER_FAIL})
             errorFilter(error)
             dispatch(push("/manageUser"))
        })
}

// Update USER by id
const updateUser = (userInput) => dispatch =>{

    let id = userInput.id
    let email = userInput.email

    if(id === email) {
         const formData = new FormData();
        formData.append("id", userInput.id);
        formData.append("email", userInput.email);
        formData.append("first_name", userInput.first_name);
        formData.append("last_name", userInput.last_name);
        if(userInput.profileChanged === true){
            formData.append("profile_picture", userInput.profile_picture);
        }
        formData.append("is_active", true);
        formData.append("is_admin", userInput.is_admin);
        formData.append("is_customer", userInput.is_customer);
        formData.append("is_merchant", userInput.is_merchant);
        formData.append("is_staff", userInput.is_staff);
        formData.append("is_activated", userInput.is_activated);

        userInput = formData;
    }
    
    axios
        .put(USER_URL + id + "/", userInput)
        .then(result => {

            if (email === id){

                axios
                .get(GET_USER_URL)
                .then(response => {

                    const user = response.data;
                    // Store user in local storage
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch({
                        type: SET_CURRENT_USER,
                        info: 'Current user sated',
                        payload: user
                    })

            })
            .catch(error => {
                // Unset current user
            })


                dispatch(push(USER_PROFILE_URL))
            }
            else {
                toast.success(
                      "USER updated successfully!"
                  )
             dispatch({type: UPDATE_USER_SUCCESS
                       })
                dispatch(getAllUser())
                dispatch(push("/manageUser"))
            }

        })
        .catch(error => {
             dispatch({type: UPDATE_USER_FAIL})
             errorFilter(error)
             dispatch(push("/manageUser"))
        })
}
export default addUserAction;