import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Divider, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Skeletons from "../components/skeletons-component";
import Posts from "../components/home/posts-component";
import SiteService from "../services/siteService";
import {connect, useDispatch, useSelector} from "react-redux";
import { setSearchPosts } from "../redux/actions/actions";
import PropTypes from "prop-types";
import postCategoryAction from "../redux/admin/category/postCategoryAction";
import postAction from "../redux/post/postAction";
import commentAction from "../redux/comment/commentAction";
import {withRouter} from "react-router-dom";
import {NO_DISPATCH, SEARCH_POST} from "../utils/Constant";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  root: {},
  gridContainer: {
    display: "flex",
    alignItems: "center",
  },
});

const service = new SiteService();

function SearchPage(props) {
  const classes = useStyles();
  const searchPosts = useSelector(state => state.blogStore.searchPosts);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [searchVal, setSearchVal] = useState(searchPosts.searchValue);
  const { t } = useTranslation();


  useEffect(() => {
    const delaySearch = setTimeout(() => {
      //wait 1 sec until user stop typing
      if (searchVal.length > 2) {
        setIsLoading(true);
        const userInput = {
            key: searchVal
        }
        props.postAction(userInput, SEARCH_POST, NO_DISPATCH)
        setIsLoading(false);

      } else {
            dispatch(setSearchPosts({ searchValue: "", posts: [] }));
      }
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [searchVal]);

  const handleChange = (ev) => {
    setSearchVal(ev.target.value);
  };

  return (
    <div className={classes.root}>
      {/* <h4>Kërko</h4> */}
      <Grid container className={classes.gridContainer}>
        <Grid item xs={false} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="standard-full-width"
            label={t("post.search")}
            style={{ margin: 8 }}
            value={searchVal}
            // placeholder="Shkruani një fjalë ose një grup fjalësh"
            helperText={t("post.search.helper")}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Divider />
      <br />
      <Grid container>
        {!isLoading && searchPosts.posts ? (
          <>
            <Posts posts={searchPosts.posts} />
          </>
        ) : (
          isLoading && <Skeletons />
        )}
      </Grid>

      <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={!!errors}
              message={errors}
              key={"topcenter"}
              action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => setErrors('')}
                  >
                    <CloseIcon />
                  </IconButton>
              }
            />
    </div>
  );
}

SearchPage.propTypes = {
  loginUser: PropTypes.object.isRequired,
  postCategoryAction: PropTypes.func.isRequired,
    postAction: PropTypes.func.isRequired,
  postCategory: PropTypes.object.isRequired,
  commentAction: PropTypes.func.isRequired

};


const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        postCategory: state.postCategory,
    }
}

export default connect(mapStateToProps, { postCategoryAction, postAction, commentAction}) (withRouter(SearchPage));