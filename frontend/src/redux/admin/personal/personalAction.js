import axios from "axios";
import {push} from "connected-react-router";
import {toast} from "react-toastify";
import {errorFilter, isEmptyUtils} from "../../../utils/Utils";

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
    SET_CURRENT_CV_SUCCESS, SEND_CONTACT_EMAIL_SUCCESS, SEND_CONTACT_EMAIL_FAIL
} from "./type";


import {
    CV_URL,
    CV_ADD_URL,
    ABOUT_PERSONAL_URL,
    ABOUT_ADD_URL,
    PROJECT_URL,
    PROJECT_ADD_URL,
    MANAGE_CV_FRONTEND_URL
    ,
    MANAGE_ABOUT_FRONTEND_URL,
    MANAGE_PROJECT_FRONTEND_URL,
    ADD_CV_FRONTEND_URL,
    ADD_ABOUT_FRONTEND_URL,
    ADD_PROJECT_FRONTEND_URL,
    ADD_ABOUT,
    UPDATE_ABOUT,
    GET_ABOUT,
    DELETE_ABOUT,
    ADD_PROJECT,
    UPDATE_PROJECT,
    GET_PROJECT,
    DELETE_PROJECT,
    ADD_CV,
    UPDATE_CV,
    GET_CV,
    DELETE_CV,
    CONTACT_EMAIL_URL, SEND_CONTACT_EMAIL
} from "../../../utils/Constant";


import {NO_DISPATCH} from "../../../utils/Constant";
import {SET_POSTS} from "../../actions/actions";

toast.configure()

const personalAction = (userInput, operation, redirectTo) => dispatch => {


    if (operation === ADD_CV )
        dispatch(addCv(userInput, redirectTo))
    else if (operation === DELETE_CV )
        dispatch(removeCv(userInput, redirectTo))
    else if (operation === UPDATE_CV )
        dispatch(updateCv(userInput, redirectTo))
    else if (operation === GET_CV )
        dispatch(getAllCv(userInput, redirectTo))
    
    else if (operation === ADD_ABOUT )
        dispatch(addAbout(userInput, redirectTo))
    else if (operation === DELETE_ABOUT )
        dispatch(removeAbout(userInput, redirectTo))
    else if (operation === UPDATE_ABOUT )
        dispatch(updateAbout(userInput, redirectTo))
    else if (operation === GET_ABOUT )
        dispatch(getAllAbout(userInput, redirectTo))

    else if (operation === ADD_PROJECT )
        dispatch(addProject(userInput, redirectTo))
    else if (operation === DELETE_PROJECT )
        dispatch(removeProject(userInput, redirectTo))
    else if (operation === UPDATE_PROJECT )
        dispatch(updateProject(userInput, redirectTo))
    else if (operation === GET_PROJECT )
        dispatch(getAllProject(userInput, redirectTo))
    else if (operation === SEND_CONTACT_EMAIL )
        dispatch(sendContactEmail(userInput, redirectTo))

}


// Send contact email
const sendContactEmail = (userInput, redirectTo) => dispatch => {

        const formData = new FormData();

        formData.append("subject", userInput.subject);
        formData.append("message", userInput.message);
        formData.append("name", userInput.name);
        formData.append("email", userInput.email);
        axios
        .post(CONTACT_EMAIL_URL, formData)
        .then(response => {
             dispatch({type: SEND_CONTACT_EMAIL_SUCCESS})
            toast.success(
                      "Email sent!"
                  )
            // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }
        })
        .catch(error => {
             dispatch({type: SEND_CONTACT_EMAIL_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))

        })

}

// Get all post Project type
const getAllProject = (userInput, redirectTo) => dispatch =>{
    axios
        .get(PROJECT_URL)
        .then(result => {
             dispatch({type: GET_ALL_PROJECT_SUCCESS,
                       payload: result.data})

             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }

        })
        .catch(error => {
             dispatch({type: GET_ALL_PROJECT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}



// Add post Project type
const addProject = (userInput, redirectTo) => dispatch => {

        const formData = new FormData();

        formData.append("name", userInput.name);
        formData.append("summary", userInput.summary);
        formData.append("link", userInput.link);
        formData.append("is_displayed", userInput.is_displayed);
        formData.append("image", userInput.image);
        axios
        .post(PROJECT_ADD_URL, formData)
        .then(response => {
             dispatch({type: ADD_PROJECT_SUCCESS})
               toast.success(
                      "Project added successfully!"
                  )
             dispatch(getAllProject())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_PROJECT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove post Project type by id
const removeProject = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(PROJECT_URL + "/" + id )
        .then(result => {

             toast.success(
                      "Project removed successfully!"
                  )
             dispatch({type: DELETE_PROJECT_SUCCESS
                       })
             dispatch(getAllProject())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_PROJECT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update post Project type by id
const updateProject = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

        const formData = new FormData();
        formData.append("id", userInput.id);
        formData.append("name", userInput.name);
        formData.append("summary", userInput.summary);
        formData.append("link", userInput.link);
        formData.append("is_displayed", userInput.is_displayed);

    axios
        .put(PROJECT_URL + "/" + id , formData)
        .then(result => {

             toast.success(
                      "Project updated successfully!"
                  )
             dispatch({type: UPDATE_PROJECT_SUCCESS
                       })

             dispatch(getAllProject())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: UPDATE_PROJECT_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}



// Get all post Cv type
const getAllCv = (userInput, redirectTo) => dispatch =>{
    axios
        .get(CV_URL)
        .then(result => {
             dispatch({type: GET_ALL_CV_SUCCESS,
                       payload: result.data})

            if(userInput === GET_ABOUT ){
                !isEmptyUtils(result.data) && result.data.map( cv => {
                       return  cv.is_displayed === true ? dispatch({type: SET_CURRENT_CV_SUCCESS,
                       payload: cv.file}) :
                           ""
                   })
            }

             // check if it has dispatch url
            if (redirectTo !== NO_DISPATCH){
                dispatch(push(redirectTo))
            }



        })
        .catch(error => {
             dispatch({type: GET_ALL_CV_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}



// Add post Cv type
const addCv = (userInput, redirectTo) => dispatch => {

        const formData = new FormData();

        formData.append("name", userInput.name);
        formData.append("file", userInput.file);
        formData.append("is_displayed", userInput.is_displayed);

        axios
        .post(CV_ADD_URL, formData)
        .then(response => {
             dispatch({type: ADD_CV_SUCCESS})
               toast.success(
                      "Cv added successfully!"
                  )
             dispatch(getAllCv())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: ADD_CV_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })

}

// Remove post Cv type by id
const removeCv = (userInput, redirectTo) => dispatch =>{

    let id = userInput.id

    axios
        .delete(CV_URL + "/" + id)
        .then(result => {

             toast.success(
                      "Cv removed successfully!"
                  )
             dispatch({type: DELETE_CV_SUCCESS
                       })
             dispatch(getAllCv())
             dispatch(push(redirectTo))
        })
        .catch(error => {
             dispatch({type: DELETE_CV_FAIL})
             errorFilter(error)
             dispatch(push(redirectTo))
        })
}

// Update post Cv type by id
const updateCv = (userInput, redirectTo) => dispatch => {

    let id = userInput.id



        const formData = new FormData();
        formData.append("id", userInput.id);
        formData.append("name", userInput.name);
        formData.append("is_displayed", userInput.is_displayed);

    axios
        .put(CV_URL + "/" + id , formData)
        .then(result => {

            toast.success(
                "Cv updated successfully!"
            )
            dispatch({
                type: UPDATE_CV_SUCCESS
            })

            dispatch(getAllCv())
            dispatch(push(redirectTo))
        })
        .catch(error => {
            dispatch({type: UPDATE_CV_FAIL})
            errorFilter(error)
            dispatch(push(redirectTo))
        })

}
// Get all post About type
    const getAllAbout = (userInput, redirectTo) => dispatch => {
        axios
            .get(ABOUT_PERSONAL_URL)
            .then(result => {
                dispatch({
                    type: GET_ALL_ABOUT_SUCCESS,
                    payload: result.data
                })

                if(userInput === GET_CV) {
                    dispatch(getAllCv(GET_ABOUT, NO_DISPATCH));
                }

                // check if it has dispatch url
                if (redirectTo !== NO_DISPATCH) {
                    dispatch(push(redirectTo))
                }

            })
            .catch(error => {
                dispatch({type: GET_ALL_ABOUT_FAIL})
                errorFilter(error)
                dispatch(push(redirectTo))
            })
    }


// Add post About type
    const addAbout = (userInput, redirectTo) => dispatch => {

        const formData = new FormData();

        formData.append("content", userInput.content);
        formData.append("is_displayed", userInput.is_displayed);

        axios
            .post(ABOUT_ADD_URL, formData)
            .then(response => {
                dispatch({type: ADD_ABOUT_SUCCESS})
                toast.success(
                    "About added successfully!"
                )
                dispatch(getAllAbout())
                dispatch(push(redirectTo))
            })
            .catch(error => {
                dispatch({type: ADD_ABOUT_FAIL})
                errorFilter(error)
                dispatch(push(redirectTo))
            })

    }

// Remove post About type by id
    const removeAbout = (userInput, redirectTo) => dispatch => {

        let id = userInput.id

        axios
            .delete(ABOUT_PERSONAL_URL + "/" + id )
            .then(result => {

                toast.success(
                    "About removed successfully!"
                )
                dispatch({
                    type: DELETE_ABOUT_SUCCESS
                })
                dispatch(getAllAbout())
                dispatch(push(redirectTo))
            })
            .catch(error => {
                dispatch({type: DELETE_ABOUT_FAIL})
                errorFilter(error)
                dispatch(push(redirectTo))
            })
    }

// Update post About type by id
    const updateAbout = (userInput, redirectTo) => dispatch => {

        let id = userInput.id


        axios
            .put(ABOUT_PERSONAL_URL + "/" + id, userInput)
            .then(result => {

                toast.success(
                    "About updated successfully!"
                )
                dispatch({
                    type: UPDATE_ABOUT_SUCCESS
                })

                dispatch(getAllAbout())
                dispatch(push(redirectTo))
            })
            .catch(error => {
                dispatch({type: UPDATE_ABOUT_FAIL})
                errorFilter(error)
                dispatch(push(redirectTo))
            })

    }



export default personalAction;