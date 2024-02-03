import React, {useState} from "react";
import "../../static /Home.css";
import logo from "../../img/logo.png";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import postAction from "../../redux/post/postAction";
import commentAction from "../../redux/comment/commentAction";
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Gb, De, It, Fr, Et, Er, Sa} from 'react-flags-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import { StackOverflowBadge } from 'react-stack-overflow-badge'
import 'react-stack-overflow-badge/dist/index.css'
import {
    ABOUT_FRONTEND_URL,
    BLOG_URL,
    CONTACT_FRONTEND_URL,
    HOME_URL, LOGIN_FRONTEND_URL,
    LOGOUT_FRONTEND_URL,
    MANAGE_COMMENT_URL,
    MANAGE_POST_CATEGORY_URL,
    MANAGE_POST_URL,
    MANAGE_USER_URL,
    PORTFOLIO_FRONTEND_URL,
    SERVICE_FRONTEND_URL,
    SIGNUP_FRONTEND_URL
} from "../../utils/Constant";
import {CssBaseline, FormControlLabel, IconButton, ListItem, ListItemIcon} from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import i18next from "i18next";
import Toolbar from "@material-ui/core/Toolbar";

import {isMobile} from 'react-device-detect';
import Grid from "@material-ui/core/Grid";
import Navigation from "./Navigation";
import List from "@material-ui/core/List";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import Youtube from '@material-ui/icons/YouTube';
import { styled } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";


const StyledMenu = withStyles({
  paper: {
    marginTop: 5,
    border: '1px solid #d3d4d5',
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"
  },
})((props) => (
  <Menu

    marginThreshold={0}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    marginThreshold: "0%",
    '&:focus': {
      backgroundColor: theme.palette.action.selected,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.primary.main,
      },
    },
  },
}))(MenuItem);

function Home(props) {

  // Language code list
 const languages = [
    {
        icon_code: <De/>,
        name: 'Deutsche',
        iso_code: 'de'
    },
     {
        icon_code: <It/>,
        name: 'Italiano',
        iso_code: 'it'
    },
    {
        icon_code: <Fr/>,
        name: 'Français',
        iso_code: 'fr'
    },
    {
        icon_code: <Gb/>,
        name: 'English',
        iso_code: 'en'
    },
    // {
    //     icon_code: <Et/>,
    //     name: 'አማርኛ',
    //     iso_code: 'am'
    // },
    // {
    //     icon_code: <Er/>,
    //     name: 'ትግርኛ',
    //     iso_code: 'ti'
    // },
     {
        icon_code: <Sa/>,
        name: 'عربي',
        iso_code: 'ar'
    }
]

// Get current language tag
const getCurrentLanguage = () => {

    let languageTag;
    const userLanguage = localStorage.getItem("i18nextLng");

    // Switch statement is not working as expected

        if (userLanguage === "en")
            languageTag =  <Gb/>;
        else if (userLanguage ==="fr")
            languageTag =  <Fr/>;
        else if (userLanguage === "de")
            languageTag = <De/>;
        else if (userLanguage === "am")
            languageTag = <Et/>;
        else if (userLanguage === "ti")
            languageTag = <Er/>;
        else if (userLanguage ==="it")
            languageTag = <It/>;
        else if (userLanguage ==="ar")
            languageTag = <Sa/>;
        else
            languageTag = <De/>;

    return languageTag;

}

      // Admin mode controller
  let adminMode = (localStorage.getItem("adminMode") === "true");
  const history = useHistory()

   const [anchorEl, setAnchorEl] = React.useState(null);

   const [state, setState] = React.useState(adminMode);

   const [currentMenu, setCurrentMenu] = useState("home")

  const handleMenuColor = (e) => {
       let menu = e.target.id;

       setCurrentMenu(menu);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

    const handleClose = () => {
    setAnchorEl(null);
  };


      // Handle "Admin mode" switch
  const handleAdminSwitchChange = ( event) => {
      setState(event.target.checked );

      // Update locate storage value
      localStorage.setItem("adminMode", event.target.checked);

      let path;

      if(localStorage.getItem("adminMode") === "true")
          path = HOME_URL;
      else
          path = HOME_URL;

      // redirect
      history.push(path)

  };

  const flexContainer = {
          display: 'flex',
          flexDirection: 'row',
          padding: 0,
          color: 'white'

        };

   // Translation object
   const userLanguage = localStorage.getItem("i18nextLng");

  // fixed Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 0);
  });
  // Toogle Menu
   const [show, setShow] = useState(false);
   const { t } = useTranslation();
  return (
    <div className="home" id="Home">
      <div className="home__bg">
        <div className="header d__flex align__items__center pxy__30">
            <Link href={HOME_URL}>
                <Avatar  src={logo} />
            </Link>
          <Navigation/>

          {/* Toogle Menu */}
          <div className="toggle__menu">
                        <div style={{marginTop:'15px'}}>
                                <ul className="navbar d__flex">
                                           {props.loginUser.isAuthenticated &&  !isMobile && (
                                                <a href={LOGOUT_FRONTEND_URL}>
                                                <li className="nav__items mx__15" style={{color: '#3f51b5'}}>{t('appbaranddrawer_nav_logout')}</li>
                                              </a>
                                            )}

                                            {!props.loginUser.isAuthenticated && !isMobile &&(
                                                <a href={LOGIN_FRONTEND_URL}>
                                                <li className="nav__items mx__15" style={{color: '#3f51b5'}}>{t('appbaranddrawer_nav_login')}</li>
                                              </a>
                                            )}
                                </ul>
                        </div>
                    {isMobile && (
                        <div style={{marginTop: "-6px"}}>
                        <Tooltip title="Select language">
                          <IconButton aria-label="photo"
                                            onClick={handleClick}
                                            aria-controls="customized-menu"
                                            >
                              <ArrowDropDownIcon color={"primary"}/>
                              {getCurrentLanguage()}
                          </IconButton>
                      </Tooltip>
                    </div>
                    )}
              {!isMobile && (
                        <div >
                        <Tooltip title="Select language">
                          <IconButton aria-label="photo"
                                            onClick={handleClick}
                                            aria-controls="customized-menu"
                                            >
                              <ArrowDropDownIcon color={"primary"}/>
                              {getCurrentLanguage()}
                          </IconButton>
                      </Tooltip>
                    </div>
                    )}

                    <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                              {languages.map(({icon_code, name, iso_code}) =>(
                                    <div onClick={handleClose}>
                                        <StyledMenuItem onClick={() => i18next.changeLanguage(iso_code)}>
                                          <ListItemIcon >
                                              <IconButton >{icon_code}</IconButton>
                                          </ListItemIcon>
                                          <Typography color={i18next.language === iso_code ? "primary": "black"}>{name}</Typography>
                                        </StyledMenuItem>
                                    </div>

                                  ))}

                     </StyledMenu>
                                      {
                props.loginUser.isAuthenticated ? (props.loginUser.user.is_admin === true || props.loginUser.user.is_staff) && !isMobile && (

                     <Grid item style={{marginTop: "8px"}}>
                          <FormControlLabel style={{color: "orange"}}
                             control={
                          <Switch
                            checked={state}
                            onChange={handleAdminSwitchChange}
                            value="adminChecked"
                            color="primary"
                            />
                            }
                            label={t("admin.mode")}
                          />
                     </Grid>

                ) : ""
            }
              {isMobile && (
                  <svg onClick={() => setShow(!show)}
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-justify white pointer"
                           viewBox="0 0 16 16"
                      >
                          <path
                              fill-rule="evenodd"
                              d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                          />
                      </svg>
              )}





          </div>
          {show ?(
          <div className="sideNavbar">
              <ul className="sidebar d__flex">
              <li className="sideNavbar">
              <a href="">{t("menu.home")}</a>
            </li>
            <li className="sideNavbar">
              <a href={ABOUT_FRONTEND_URL}>{t("home.about")}</a>
            </li>
            <li className="sideNavbar">
              <a href={SERVICE_FRONTEND_URL}>{t("home.service")}</a>
            </li>
            <li className="sideNavbar">
              <a href={PORTFOLIO_FRONTEND_URL}>{t("home.portfolio")}</a>
            </li>
            <li className="sideNavbar">
              <a href={BLOG_URL}>{t("home.blog")}</a>
            </li>
            <li className="sideNavbar">
              <a href={CONTACT_FRONTEND_URL}>{t("home.contact")}</a>
            </li>
                {props.loginUser.isAuthenticated && !isMobile && (
                    <li className="sideNavbar">
                    <a href={LOGOUT_FRONTEND_URL}>{t('appbaranddrawer_nav_logout')}</a>
                  </li>
                )}

                {!props.loginUser.isAuthenticated && !isMobile && (
                    <li className="sideNavbar">
                    <a href={LOGIN_FRONTEND_URL}>{t('appbaranddrawer_nav_login')}</a>
                  </li>
                )}

              </ul>
          </div>
           ) : null}
        </div>
        {/* HOME CONTENT */}
        <div className="container">
          <div className="home__content">
            <div className="home__meta">
                <h1 className="home__text pz__10">{t("home.welcome.title")}</h1>
              <h2 className="home__text pz__10">{t("home.welcome.name")}</h2>
              <h3 className="home__text sweet pz__10">{t("home.welcome.profession")}</h3>
            </div>
              <br/>
              <br/>
              <div style={{display: "inline", marginLeft: "10%", }}>
                <div style={{display: "inline", padding: "20px"}} >
                    <a  target="_blank" className="link-social" href="https://www.linkedin.com/in/zekarias-taye-hirpo/">
                        <LinkedInIcon /></a></div>
                <div style={{display: "inline", padding: "20px"}}>
                    <a  target="_blank" className="link-social" href="https://github.com/ztaye3">
                    <GitHubIcon /></a></div>
                  <div style={{display: "inline", padding: "20px"}} >
                      <a  target="_blank" className="link-social" href="https://twitter.com/ZekariasTaye">
                          <TwitterIcon /></a></div>
                  <div style={{display: "inline", padding: "20px"}}>
                    <a target="_blank" rel="canonical"   className="link-social" href="https://www.youtube.com/channel/UCw49mNQhDEV82Xwyr68q77Q">
                        <Youtube /></a></div>
                  <div style={{display: "inline", padding: "20px"}}>
                    <a  target="_blank"  className="link-social" href="https://stackoverflow.com/users/15584536/zekarias-taye-hirpo">
                        <StackOverflowBadge id={15584536} card={false} />
                        </a></div>
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
          <Typography variant="body2" style={{color:"white"}} align="center">
              {"Copyright © "}
              <Link  href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
          </Typography>
      </div>
    </div>
  );
}

Home.propTypes = {
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

export default connect(mapStateToProps, { postCategoryAction, postAction, commentAction}) (withRouter(Home));
