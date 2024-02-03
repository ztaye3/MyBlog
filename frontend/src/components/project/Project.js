import React, {useEffect} from "react";
import "../../static /Project.css";
import Project1 from '../../img/portfolio-1.jpg';
import Project2 from '../../img/portfolio-2.jpg';
import Project3 from '../../img/portfolio-3.jpg';
import Project4 from '../../img/portfolio-4.jpg';
import logo from "../../img/logo.png";
import Navigation from "../home/Navigation";
import {useTranslation, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import addUserAction from "../../redux/admin/user/addUserAction";
import personalAction from "../../redux/admin/personal/personalAction";
import {withRouter} from "react-router-dom";
import {
    ABOUT_FRONTEND_URL,
    GET_ABOUT,
    GET_CV,
    GET_PROJECT,
    HOME_URL,
    PORTFOLIO_FRONTEND_URL
} from "../../utils/Constant";
import {isEmptyUtils} from "../../utils/Utils";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Project(props) {

  const { t } = useTranslation();

        /**
     * Component did mount
     * Fetch Project
     */
    useEffect(() => {
        // Get all cv
        // Get all about
        props.personalAction(null, GET_PROJECT, PORTFOLIO_FRONTEND_URL)

    }, []);



  return (
      <div style={{backgroundColor: "#191919"}}>
        <div className="header d__flex align__items__center pxy__30">
                      <Link href={HOME_URL}>
                <Avatar  src={logo} />
            </Link>

          <Navigation/>
        </div>
            <div className="project component__space" id="Portfolio">
              <div className="heading">
                <h1 className="heading">{t("project.title.myLatest")}</h1>
                <p className="heading p__color">
                    {t("project.subtitle.one")}
                </p>
                <p className="heading p__color">
                    {t("project.subtitle.two")}
                </p>
              </div>
               <div className="container">
                   <div className="row">

                       {!isEmptyUtils(props.personal.project) && props.personal.project.map(project => {
                               return project.is_displayed === true ? (
                                   <div className="col__3">
                                            <div className="project__box pointer relative">
                                                <div className="project__box__img pointer relative">
                                                    <div className="project__img__box">
                                                        <img src={project.image} alt="" className="project__img"/>
                                                    </div>
                                                    <div className="mask__effect"></div>
                                                </div>
                                                <div className="project__meta absolute">
                                                    <h5 className="project__text">{project.name}</h5>
                                                    <h4 className="project__text">{project.summary}</h4>
                                                    <a href={project.link} className="project__btn" target="_blank"  >{t("project.view.detail")}</a>
                                                </div>
                                            </div>
                                        </div>

                                   ):
                           ""
                   })}



                   </div>
               </div>
            </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
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

Project.propTypes = {
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

export default connect(mapStateToProps, {addUserAction, personalAction})(withTranslation()(withRouter(Project)));
