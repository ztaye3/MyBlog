import React, {useEffect, useState} from "react";
import "../../static /About.css";
import aboutImg from "../../img/about.jpg";
import Navigation from "../home/Navigation";
import logo from "../../img/logo.png";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import addUserAction from "../../redux/admin/user/addUserAction";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import personalAction from "../../redux/admin/personal/personalAction";
import {useTranslation, withTranslation} from "react-i18next";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import {
    ABOUT_FRONTEND_URL,
    BLOG_FRONTEND_URL,
    GET_ABOUT,
    GET_CV,
    GET_POST_BY_CATEGORY,
    GET_POST_CATEGORY, HOME_URL
} from "../../utils/Constant";
import {isEmptyUtils} from "../../utils/Utils";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
function About(props) {

  const { t } = useTranslation();
  //  Up To Top Btn
    window.addEventListener("scroll", function(){
      const upToTop = document.querySelector("a.bottom__to__top");
       upToTop.classList.toggle("active", window.scrollY > 0)
    });



      /**
     * Component did mount
     * Fetch cv
     * Fetch about
     */
    useEffect(() => {
        // Get all cv
        // Get all about
        props.personalAction(GET_CV, GET_ABOUT, ABOUT_FRONTEND_URL)

    }, []);



  return (
      <div style={{backgroundColor: "#191919"}}>
        <div className="header d__flex align__items__center pxy__30">
                     <Link href={HOME_URL}>
                <Avatar  src={logo} />
            </Link>

          <Navigation/>
        </div>

        <div className="about component__space" id="About">
          <div className="container">
            <div className="row">
              <div className="col__2">
                <img src={aboutImg} alt="" className="about__img"/>
              </div>
              <div className="col__2">
                <h1 className="about__heading">{t("about.aboutMe")}</h1>
                <div className="about__meta">

                   {!isEmptyUtils(props.personal.about) && props.personal.about.map( about => {
                       return about.is_displayed === true ? <p className="about__text p__color">{about.content}</p> :
                           ""
                   })}

                   <div className="about__button d__flex align__items__center">
                    <a href={props.personal.current_cv} download target="_blank" >
                      <button className="about btn pointer">{t("about.downloadCv")}</button>
                    </a>
                    {/*<a href="#">*/}
                    {/*  <button className="about btn pointer">Hire Me</button>*/}
                    {/*</a>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* UP TO TOP BTN */}
          <div className="up__to__top__btn">
            <a href="#" className="bottom__to__top">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-up white"
                  viewBox="0 0 16 16"
              >
                <path
                    fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            </a>
          </div>
        </div>

            <Typography variant="body2" style={{color:"white"}} align="center">
              {"Copyright © "}
              <Link  href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>

      </div>
  );
}

About.propTypes = {
  addUserAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  personalAction: PropTypes.func.isRequired,
  postCategory: PropTypes.object.isRequired,
    personal: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        users: state.userAdmin.users,
        postCategory: state.postCategory,
        personal: state.personal
    }
}

export default connect(mapStateToProps, {addUserAction, personalAction})(withTranslation()(withRouter(About)));
