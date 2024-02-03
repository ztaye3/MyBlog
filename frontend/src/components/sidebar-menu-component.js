import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory } from "react-router-dom";
import Constants from "../constants/constants";
import { useDispatch } from "react-redux";
import { setTitle } from "../redux/actions/actions";
import PersonIcon from '@material-ui/icons/Person';
import {
  BLOG_FAVORITE_FRONTEND_URL,
  BLOG_FRONTEND_URL, BLOG_POST_FRONTEND_URL,
  BLOG_SAVED_FRONTEND_URL,
  BLOG_SEARCH_FRONTEND_URL, BLOG_SETTING_FRONTEND_URL, HOME_URL
} from "../utils/Constant";
import {useTranslation} from "react-i18next";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    minHeight: "44px !important",
  },
}));

export default function SideBarMenu({ open, handleOpen }) {
  const classes = useStyles();
  //   const theme = useTheme();
  const history = useHistory();
  const [value, setValue] = React.useState(history.location.pathname);
  const dispatch = useDispatch();

  const { t } = useTranslation();

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

  const handleChange = (newValue) => {
    history.push(newValue);
    setValue(newValue);
    // setTitleByRoute(newValue);
  };

  const isSelected = (route) => {
    return history.location.pathname === route;
  };

  useEffect(() => {
    setTitleByRoute(value);
  }, [value]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <span style={{ margin: "0 auto" }}>{Constants.appName}</span>
          <IconButton onClick={handleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={1}
            selected={isSelected(HOME_URL)}
            onClick={e => {
                        e.preventDefault();
                        window.location.href = HOME_URL
                      }}

          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("menu.home")} />
          </ListItem>
          <ListItem
            button
            key={2}
            selected={isSelected(BLOG_SEARCH_FRONTEND_URL)}
            onClick={() => handleChange(BLOG_SEARCH_FRONTEND_URL)}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={t("menu.search")} />
          </ListItem>

          <ListItem
            button
            key={5}
            selected={isSelected(BLOG_FRONTEND_URL)}
            onClick={() => handleChange(BLOG_FRONTEND_URL)}

          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t("nav.zach")} />
          </ListItem>

          <ListItem
            button
            key={5}
            selected={isSelected(BLOG_SETTING_FRONTEND_URL)}
            onClick={() => handleChange(BLOG_SETTING_FRONTEND_URL)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t("menu.setting")} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
