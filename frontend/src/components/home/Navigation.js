import PropTypes from "prop-types";
import {connect, useDispatch} from "react-redux";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import postAction from "../../redux/post/postAction";
import commentAction from "../../redux/comment/commentAction";
import {withRouter} from "react-router-dom";
import {
    ABOUT_FRONTEND_URL, BLOG_URL, CONTACT_FRONTEND_URL, HOME_URL, MANAGE_ABOUT_FRONTEND_URL,
    MANAGE_COMMENT_URL, MANAGE_CV_FRONTEND_URL,
    MANAGE_POST_CATEGORY_URL,
    MANAGE_POST_URL, MANAGE_PROJECT_FRONTEND_URL,
    MANAGE_USER_URL, PORTFOLIO_FRONTEND_URL, SERVICE_FRONTEND_URL
} from "../../utils/Constant";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {setDarkTheme, setNavColor} from "../../redux/actions/actions";
import {isEmptyUtils} from "../../utils/Utils";

function Navigation(props){

      const { t } = useTranslation();

     // Admin mode controller
      let adminMode = (localStorage.getItem("adminMode") === "true");


      const dispatch = useDispatch();

      const currentMenu = window.location.pathname;



    return (
                  <div className="navigation pxy__30">
              { ((props.loginUser.isAuthenticated && (localStorage.getItem("adminMode") === "true")) ? (

                              <ul className="navbar d__flex">
                                  <a href={HOME_URL}>
                                    <li className="nav__items mx__15" id="home">{t("menu.home")}</li>
                                  </a>
                                  <a href={MANAGE_USER_URL}>
                                    <li className="nav__items mx__15" id="user">{t("home.user")}</li>
                                  </a>
                                  <a href={MANAGE_POST_URL}>
                                    <li className="nav__items mx__15" id="post">{t("home.post")}</li>
                                  </a>
                                  <a href={MANAGE_COMMENT_URL}>
                                    <li className="nav__items mx__15" id="comment">{t("home.comment")}</li>
                                  </a>
                                  <a href={MANAGE_POST_CATEGORY_URL}>
                                    <li className="nav__items mx__15" id="category">{t("home.category")}</li>
                                  </a>
                                  <a href={MANAGE_CV_FRONTEND_URL}>
                                    <li className="nav__items mx__15" id="post">{t("personal.cv")}</li>
                                  </a>
                                  <a href={MANAGE_ABOUT_FRONTEND_URL}>
                                    <li className="nav__items mx__15" id="comment">{t("personal.about")}</li>
                                  </a>
                                  <a href={MANAGE_PROJECT_FRONTEND_URL}>
                                    <li className="nav__items mx__15" id="category">{t("personal.project")}</li>
                                  </a>

                              </ul>
              ): (
                  <ul className="navbar d__flex" >
                      <a href={HOME_URL} >
                        <li className="nav__items mx__15"
                            id="home" style={{color: (currentMenu === HOME_URL || currentMenu === "/" ) ? '#ff9800' : '#FFFFFF'}}>{t("menu.home")}</li>
                      </a>
                      <a href={ABOUT_FRONTEND_URL} >
                        <li className="nav__items mx__15"
                            style={{color: currentMenu === ABOUT_FRONTEND_URL? '#ff9800' : '#FFFFFF'}}
                            id="about">{t("home.about")}</li>
                      </a>
                      <a href={SERVICE_FRONTEND_URL}>
                        <li className="nav__items mx__15" 
                            style={{color: currentMenu === SERVICE_FRONTEND_URL? '#ff9800' : '#FFFFFF'}}
                            id="service">{t("home.service")}</li>
                      </a>
                      <a href={PORTFOLIO_FRONTEND_URL}>
                        <li className="nav__items mx__15" 
                            style={{color: currentMenu === PORTFOLIO_FRONTEND_URL? '#ff9800' : '#FFFFFF'}}
                            id="portfolio">{t("home.portfolio")}</li>
                      </a>
                      <a href={BLOG_URL}>
                        <li className="nav__items mx__15" 
                            style={{color: currentMenu === BLOG_URL? '#ff9800' : '#FFFFFF'}}
                            id="blog">{t("home.blog")}</li>
                      </a>
                      <a href={CONTACT_FRONTEND_URL}>
                        <li className="nav__items mx__15" 
                            style={{color: currentMenu === CONTACT_FRONTEND_URL? '#ff9800' : '#FFFFFF'}}
                            id="contact">{t("home.contact")}</li>
                      </a>

                  </ul>
              ))}
          </div>

    )

}

Navigation.propTypes = {
  post: PropTypes.object,
  showDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
  postAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        postCategory: state.postCategory,
    }
}

export default connect(mapStateToProps, { postCategoryAction, postAction, commentAction}) (withRouter(Navigation));