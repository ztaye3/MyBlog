import {Route} from "react-router-dom";
import About from "../components/about/About";
import Service from "../components/services/Service";
import Project from "../components/project/Project";
import Contact from "../components/contact/Contact";
import Footer from "../Footer";
import Activate from "../components/signup/Activate";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import React from "react";

export const AUTHORIZATION = "AUTHORIZATION";
export const DASHBOARD_URL = "/dashboard";

// Back end URLs
export const BASE_BACKEND_URL = "http://127.0.0.1:8000";
export const BASE_FRONTEND_URL = "http://localhost:3000"
export const LOGIN_URL = "/api/auth/v1/jwt/create/";
export const GET_USER_URL = "/api/auth/v1/users/me/";
export const SIGNUP_URL = "/api/auth/v1/users/";
export const LOGOUT_URL = "/api/auth/v1/token/logout/";
export const AUTH_LOGIN_REDIRECT_URL = "/login/?next=";
export const ACTIVATE_ACCOUNT_URL = "/api/auth/v1/users/activation/";
export const VERIFY_TOKEN_URL = "/api/auth/v1/jwt/verify/";
export const REFRESH_TOKEN_URL = "/api/auth/v1/jwt/";
export const RESET_PASSWORD_URL = "/api/auth/v1/users/reset_password/";
export const RESET_PASSWORD_CONFIRM_URL = "/api/auth/v1/users/reset_password_confirm/";
export const ACTIVATE_USER_UPDATE_PROFILE_URL = "/api/auth/v1/update-profile/";
export const ACTIVATE_USER_REDIRECT_URL = "/activate/uid/token";
export const GET_POST_BY_CATEGORY_URL ='/api/blog/post/category/v1/';

export const SEARCH_POST_URL ='/api/blog/post/search/v1/';

export const PRODUCT_URL = "/api/product/v1/";
export const PRODUCT_TYPE_URL = "/api/product/v1/type/";
export const PRODUCT_UNIT_URL = "/api/product/v1/unit/";
export const PRODUCT_TYPE_GET_URL = "/api/product/v1/type/getAll/";
export const PRODUCT_UNIT_GET_URL = "/api/product/v1/unit/getAll/";
export const IMAGE_SLIDER_URL = "/api/product/v1/slider/";
export const IMAGE_SLIDER_GET_URL = "/api/product/v1/slider/getAll/";
export const ADD_IMAGE_SLIDER_URL = "/api/product/v1/slider/addImageSlider/";


export const USER_URL = "/api/auth/v1/user/";
export const ADD_USER_URL ="/api/auth/v1/addUser/";
export const ADD_PRODUCT_URL = "/api/product/v1/addProduct/";
export const ADD_PRODUCT_TYPE_URL = "/api/product/v1/type/addProductType/";
export const ADD_PRODUCT_UNIT_URL = "/api/product/v1/unit/addProductUnit/";
export const PRODUCT_BY_CATEGORY_URL = "/api/product/v1/searchCategory"
export const PRODUCT_BY_NAME_URL = "/api/product/v1/searchProduct"
export const SUBMIT_ORDER_URL = "/api/order/v1/addOrder/";
export const ORDER_URL = "/api/order/v1/";
export const UPDATE_RATE_URL = "/api/product/v1/updateRate"

export const POST_CATEGORY_GET_URL = "/api/blog/category/v1/";
export const POST_CATEGORY_ADD_URL = "/api/blog/category/v1/addCategory/";
export const POST_GET_URL = "/api/blog/post/v1/";
export const POST_ADD_URL = "/api/blog/post/v1/addPost/";
export const POST_GET_DETAIL_URL = "/api/blog/post/detail/v1/";

export const POST_COMMENT_GET_URL = "/api/comment/v1/";
export const POST_COMMENT_ADD_URL = "/api/comment/v1/addComment/";
export const POST_LIKE_ADD_URL = "/api/blog/post/like/v1/";

export const CV_URL = "/api/personal/v1/cv";
export const CV_ADD_URL = "/api/personal/v1/cv/addCv";

export const ABOUT_PERSONAL_URL = "/api/personal/v1/about";
export const ABOUT_ADD_URL = "/api/personal/v1/about/addAbout";

export const PROJECT_URL = "api/personal/v1/project";
export const PROJECT_ADD_URL = "api/personal/v1/project/addProject";
export const CONTACT_EMAIL_URL = "api/personal/v1/contact";

// Front end URL
export const MANAGE_USER_URL = "/manageUser"
export const MANAGE_PRODUCT_TYPE_URL = "/manageProductType"
export const MANAGE_ADD_PRODUCT_TYPE_URL = "/manageAddProductType"
export const MANAGE_ADD_PRODUCT_UNIT_URL = "/manageAddProductUnit"
export const MANAGE_PRODUCT_UNIT_URL = "/manageProductUnit"
export const ADD_MANAGE_USER_URL = "/addUser"
export const MANAGE_PRODUCT_URL = "/manageProduct"
export const ADD_PRODUCT = "/addProduct"
export const HOME_URL = "/home"
export const CATEGORY_URL = "/categories"
export const CART_URL = "/cart"
export const BLOG_URL = "/blog"
export const ABOUT_URL = "/aboutUs"
export const MANAGE_BLOG_URL = "/manageBlog"
export const MANAGE_ABOUT_URL = "/manageAbout"
export const MANAGE_ORDER_URL = "/manageOrder"
export const CHECKOUT_URL = "/checkout";
export const MANAGE_SLIDER_URL = "/manageSlider"
export const ADD_SLIDER_URL = "/addSlider"
export const USER_PROFILE_URL = "/profile"


export const ABOUT_FRONTEND_URL = "/about"
export const SERVICE_FRONTEND_URL = "/services"
export const CONTACT_FRONTEND_URL = "/contact"
export const LOGIN_FRONTEND_URL = "/login"
export const SIGNUP_FRONTEND_URL = "/signup"
export const PORTFOLIO_FRONTEND_URL = "/portfolio"
export const LOGOUT_FRONTEND_URL = "/logout"

export const MANAGE_POST_CATEGORY_URL = "/managePostCategory"
export const MANAGE_POST_URL = "/managePost"
export const MANAGE_COMMENT_URL = "/manageComment"
export const ADD_POST_CATEGORY_URL = "/addPostCategory"
export const ADD_POST_URL = "/addPost"
export const ADD_COMMENT_URL = "/addComment"
export const BLOG_FRONTEND_URL = "/blog/"
export const BLOG_SEARCH_FRONTEND_URL = "/blog/search/"
export const BLOG_FAVORITE_FRONTEND_URL = "/blog/favorites/"
export const BLOG_SAVED_FRONTEND_URL = "/blog/saved/"
export const BLOG_SETTING_FRONTEND_URL = "/blog/settings/"
export const BLOG_POST_FRONTEND_URL = "/blog/post/"

export const MANAGE_CV_FRONTEND_URL = "/manageCv"
export const MANAGE_ABOUT_FRONTEND_URL = "/manageAbout"
export const MANAGE_PROJECT_FRONTEND_URL = "/manageProject"
export const ADD_CV_FRONTEND_URL = "/addCv"
export const ADD_ABOUT_FRONTEND_URL = "/addAbout"
export const ADD_PROJECT_FRONTEND_URL = "/addProject"

// Variable constant
export const GET_PRODUCT_BY_CATEGORY = "getProductByCategory"
export const GET_PRODUCT_BY_NAME = "getProductByName"
export const PRODUCT_CATEGORY_ONE= "HABESHA_CLOTH"
export const PRODUCT_CATEGORY_TWO= "HABESHA_INGREDIENT"
export const PRODUCT_CATEGORY_THREE= "DETERGENT"
export const PRODUCT_CATEGORY_FOUR= "SOFT_DRINK"
export const ADD_TO_CART = "addToCart"
export const CURRENCY = 'CHF';
// Automate is b/n production and testing
export const STRIPE_PUB_KEY ="pk_test_51JIETXFjmXVud4Gb9QpJxJygu21vbmyutdVrYq4nsgICQLrcsUJBJ7abA3jxfkqMkCFiJVeLXgOXFklMLocYiitH00o5xqE3S5";
export const CALL_CHECKOUT = "stripeCheckout";
export const SUBMIT_ORDER = "submitOrder";
export const GET_ORDER = "getOrder";
export const UPDATE_ORDER = "updateOrder";
export const DELETE_ORDER = "deleteOrder";
export const UPDATE_RATE = "updateRate";
export const UPDATE_SHIPPING = "updateShipping";
export const UPDATE_PAYMENT = "updatePayment";
export const UPDATE_ACTIVE_STATE = "updateActiveState";

export const ADD_PRODUCT_TYPE = "ADD_PRODUCT_TYPE";
export const UPDATE_PRODUCT_TYPE = "UPDATE_PRODUCT_TYPE";
export const GET_PRODUCT_TYPE = "GET_PRODUCT_TYPE";
export const DELETE_PRODUCT_TYPE = "DELETE_PRODUCT_TYPE";

export const ADD_PRODUCT_UNIT = "ADD_PRODUCT_UNIT";
export const UPDATE_PRODUCT_UNIT = "UPDATE_PRODUCT_UNIT";
export const GET_PRODUCT_UNIT = "GET_PRODUCT_UNIT";
export const DELETE_PRODUCT_UNIT = "DELETE_PRODUCT_UNIT";
export const NO_DISPATCH = "NO_DISPATCH";
export const GET_PRODUCT_UNIT_TYPE = "GET_PRODUCT_UNIT_TYPE";
export const SEARCH_BY_CATEGORY_DEFAULT = "SEARCH_BY_CATEGORY_DEFAULT";

export const ADD_SLIDER = "ADD_SLIDER";
export const GET_SLIDER = "GET_SLIDER";
export const DELETE_SLIDER = "DELETE_SLIDER";

export const ADD_POST_CATEGORY = "ADD_POST_CATEGORY";
export const UPDATE_POST_CATEGORY = "UPDATE_POST_CATEGORY";
export const GET_POST_CATEGORY = "GET_POST_CATEGORY";
export const DELETE_POST_CATEGORY = "DELETE_POST_CATEGORY";


export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const GET_POST = "GET_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_POST_DETAIL = "GET_POST_DETAIL";
export const GET_POST_BY_CATEGORY = "GET_POST_BY_CATEGORY";
export const GET_SINGLE_POST_DETAIL = "GET_SINGLE_POST_DETAIL";

export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const GET_COMMENT = "GET_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const GET_POST_COMMENT = "GET_POST_COMMENT";
export const UPDATE_POST_LIKE = "UPDATE_POST_LIKE";
export const SEARCH_POST = "SEARCH_POST";

export const ADD_CV = "ADD_CV";
export const UPDATE_CV = "UPDATE_CV";
export const GET_CV = "GET_CV";
export const DELETE_CV = "DELETE_CV";

export const ADD_ABOUT = "ADD_ABOUT";
export const UPDATE_ABOUT = "UPDATE_ABOUT";
export const GET_ABOUT = "GET_ABOUT";
export const DELETE_ABOUT = "DELETE_ABOUT";

export const ADD_PROJECT = "ADD_PROJECT ";
export const UPDATE_PROJECT  = "UPDATE_PROJECT ";
export const GET_PROJECT  = "GET_PROJECT ";
export const DELETE_PROJECT  = "DELETE_PROJECT ";

export const SEND_CONTACT_EMAIL  = "SEND_CONTACT_EMAIL";
