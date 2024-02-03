import {CREATE_USER_SUBMIT, CREATE_USER_SUCCESS, CREATE_USER_ERROR} from "./signupType";
import axios from "axios";
import {toast} from "react-toastify";
import {SIGNUP_URL} from "../../utils/Constant";
import {errorFilter} from "../../utils/Utils";
import {push} from "connected-react-router";

export const signupAction = userInput => {
  return function(dispatch){
      // Dispatch submit action type, set submit state
      dispatch({
          type:CREATE_USER_SUBMIT,
          info: "Submit signup request"});

      // Initiate signup request to backend server
      axios
          .post(SIGNUP_URL, userInput)
          .then(response => {
              // Display in success toast
              toast.success(
                  "User " + userInput.email+
                  " created successfully!"
              )
              // Dispatch submit success action, set success state
              dispatch({
                  type: CREATE_USER_SUCCESS,
                  info: "User create successfully"
              })

              // Store user email for account verification
              localStorage.setItem("signupEmail", userInput.email);

              dispatch(push("/signup"))

          })

          //If error
          .catch(error => {

              dispatch({
                      type: CREATE_USER_ERROR,
                      info: "Signup process failed",
                      errorData: error.response.data
                  });

              // Display error notification
                errorFilter(error);
          })
  }
}

export default signupAction