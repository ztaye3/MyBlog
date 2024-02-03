import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory } from "react-router-dom";
import Constants from "../constants/constants";
import { useDispatch } from "react-redux";
import { setTitle } from "../redux/actions/actions";
import {
  BLOG_FAVORITE_FRONTEND_URL,
  BLOG_FRONTEND_URL,
  BLOG_SAVED_FRONTEND_URL,
  BLOG_SEARCH_FRONTEND_URL, BLOG_SETTING_FRONTEND_URL, HOME_URL
} from "../utils/Constant";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    left: "0px",
    right: "0px",
    bottom: 0,
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  let history = useHistory();
   const { t } = useTranslation();
  const [value, setValue] = React.useState(history.location.pathname);

  const dispatch = useDispatch();
  const handleTitle = (title) => dispatch(setTitle(title));

  const setTitleByRoute = (value) => {
    switch (value) {
      case BLOG_FRONTEND_URL:
        handleTitle(Constants.appName);
        break;
      case BLOG_SEARCH_FRONTEND_URL:
        handleTitle("Search");
        break;
      case BLOG_SETTING_FRONTEND_URL:
        handleTitle("Setting");
        break;
      default:
        handleTitle(Constants.appName);
        break;
    }
  };

  useEffect(() => {
    setTitleByRoute(value);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTitleByRoute(newValue);
    history.push(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction label="Home"  icon={<HomeIcon />}             onClick={e => {
                        e.preventDefault();
                        window.location.href = HOME_URL
                      }}/>
      <BottomNavigationAction
        label={t("menu.search")}
        value={BLOG_SEARCH_FRONTEND_URL}
        icon={<SearchIcon />}
      />

      <BottomNavigationAction
        label={t("menu.setting")}
        value={BLOG_SETTING_FRONTEND_URL}
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
