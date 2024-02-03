import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import signupReducer from "./signup/signupReducer";
import loginReducer from "./login/loginReducer";
import activateReducer from "./signup/activateReducer";
import addUserReducer from "./admin/user/addUserReducer";
import postCategoryReducer from "./admin/category/postCategoryReducer";
import postReducer from "./post/postReducer";
import commentReducer from "./comment/commentReducer";
import blogReducer from './reducers/reducers';
import personalReducer from "./admin/personal/personalReducer";

// Synchronize state over history -> store-> router -> components
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    signupUser: signupReducer,
    loginUser: loginReducer,
    activateUser: activateReducer,
    userAdmin: addUserReducer,
    postCategory: postCategoryReducer,
    post: postReducer,
    comment: commentReducer,
    blogStore: blogReducer,
    personal: personalReducer
  });

export default createRootReducer;