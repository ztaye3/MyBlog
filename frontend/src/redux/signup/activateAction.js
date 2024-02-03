import axios from "axios";
import {
    ACTIVATE_ACCOUNT_URL,
    ACTIVATE_USER_REDIRECT_URL,
    ACTIVATE_USER_UPDATE_PROFILE_URL,
    SIGNUP_URL
} from "../../utils/Constant";
import {
    ACTIVATE_SET_ACCOUNT_TYPE,
    ACTIVATE_USER_CHANGE_STATE,
    ACTIVATE_USER_ERROR,
    ACTIVATE_USER_SUCCESS, ACTIVATE_USER_UPDATE_PROFILE_ERROR, ACTIVATE_USER_UPDATE_PROFILE_SUCCESS,
} from "./signupType";
import {errorFilter, isEmptyUtils} from "../../utils/Utils";
import {toast} from "react-toastify";
import {push} from "connected-react-router";


const activateAction = (userInput, operation) => dispatch =>{

      if(!isEmptyUtils(operation)){

          // Activate user
          if(operation.toString() === "activate"){
              dispatch(activateUser(userInput));
          }

          else if (operation.toString() === "configureAccount"){
              dispatch(configureAccount(userInput));
              dispatch(changeState());
          }

          // Change state
          else if(operation.toString() === "changeState"){
              dispatch(changeState());
          }

           // Setup account details
          else if(operation.toString() === "setupAccountDetails"){

              dispatch(updateUserDate(userInput));
          }

          // Skipp account setup
          else if(operation.toString() === "skip"){
              dispatch(push("/login"));
          }
      }
}

// Account type configuration
const configureAccount = (userInput) => dispatch => {

    dispatch({
              type: ACTIVATE_SET_ACCOUNT_TYPE,
              payload: userInput
    })
}
// Update user data
const updateUserDate = (userInput) => dispatch => {

    const signupEmail = localStorage.getItem("signupEmail")

    if(!isEmptyUtils(signupEmail)){

        const data = {
            ...userInput,
            email: signupEmail
        }

        const formData = new FormData();


        formData.append("email", data.email);
        if(data.profile_picture !== null){
            formData.append("profile_picture", data.profile_picture);
        }

        axios.post(ACTIVATE_USER_UPDATE_PROFILE_URL, formData)
            .then(response => {

                dispatch({
                    type: ACTIVATE_USER_UPDATE_PROFILE_SUCCESS
                })
                dispatch(push("/login"));
            })
            .catch(error => {
                dispatch({
                    type: ACTIVATE_USER_UPDATE_PROFILE_ERROR
                })
                // Display error notification
                errorFilter(error);
            })

    }
}

// Change state
const changeState = () => dispatch =>{
    dispatch({
        type: ACTIVATE_USER_CHANGE_STATE
    })

    dispatch(push(ACTIVATE_USER_REDIRECT_URL));
}

// Activate user
const activateUser =  userInput => {

    return function (dispatch){
         axios
          .post(ACTIVATE_ACCOUNT_URL, userInput)
          .then(response => {
              // Display in success toast
              toast.success(

                  " Account activated successfully!"
              )
              // Dispatch submit success action, set success state
              dispatch({
                  type: ACTIVATE_USER_SUCCESS,
                  info: "Activated  successfully"
              })

              // Redirect to activate account
              dispatch(push(ACTIVATE_USER_REDIRECT_URL));

          })

          //If error
          .catch(error => {

              dispatch({
                      type: ACTIVATE_USER_ERROR,
                      info: "Signup process failed",
                  });

              // Display error notification
                errorFilter(error);
          })
        }
}

export default activateAction;