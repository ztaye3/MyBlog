import axios from "axios";
import {AUTHORIZATION} from "./Constant";
import { toast } from "react-toastify";

toast.configure()

// Axios token authentication header setter
export const setAxiosTokenAuthHeader = (auth_token) => {

    // Check if token is not empty
    if(auth_token && typeof auth_token != 'undefined'){
        // Append token on every axios request header
        axios.defaults.headers.common[AUTHORIZATION] = "JWT " + auth_token;
    }
    else {
        // Remove token auth header
        delete axios.defaults.headers.common[AUTHORIZATION]
    }
}

// Error display filter
export const errorFilter = (error) => {
    // Known error
    if(error.response){
        toast.error(JSON.stringify(error.response.data));
    }
    else if (error.message) {
    toast.error(JSON.stringify(error.message));
  }
  else {
    toast.error(JSON.stringify(error));
  }
}

export const isEmptyUtils = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);


export const unsetLocalStorage = () =>{

            // Unset local storages
            setAxiosTokenAuthHeader("");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");
}