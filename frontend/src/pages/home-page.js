import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SectionsHeader from "../components/home/sections-component";
import FeaturedPost from "../components/featured-post-component";
import Posts from "../components/home/posts-component";
import SiteService from "../services/siteService";
import { IconButton } from "@material-ui/core";
import Skeletons from "../components/skeletons-component";
import { usePrevious } from "../customHooks/custom-hooks";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarNoInternet from "../components/snackbar-no-internet-component";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/actions/actions";
import {withRouter} from "react-router-dom";
import postCategoryAction from "../redux/admin/category/postCategoryAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BLOG_FRONTEND_URL, GET_POST_BY_CATEGORY, GET_POST_CATEGORY, MANAGE_POST_CATEGORY_URL} from "../utils/Constant";
import {isEmptyUtils} from "../utils/Utils";
import postAction from "../redux/post/postAction";
import AddComment from "../components/comment/AddComment";

const useStyles = makeStyles((theme) => ({
  root: {},
  close: {
    padding: theme.spacing(0.5),
  },
}));

const service = new SiteService();

function HomePage(props) {
  const classes = useStyles();
  const posts = useSelector((state) => state.blogStore.posts);
  const tabSelected = useSelector((state) => state.blogStore.tabSelected);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const tabSelectedPrev = usePrevious(tabSelected);

  const sections = props.postCategory.postCategory;


    /**
     * Component did mount
     * Fetch categories
     * Fetch the first post
     */
    useEffect(() => {
        // Get the first post
        setIsLoading(true);
        // Get all categories
        props.postCategoryAction(GET_POST_BY_CATEGORY, GET_POST_CATEGORY, BLOG_FRONTEND_URL)
        setIsLoading(false);

    }, []);


    /**
     * Component did update
     * Fetch Post by categories
     */
  useEffect(() => {

    if (!isEmptyUtils(sections) && (!posts || (tabSelectedPrev && tabSelectedPrev !== tabSelected))) {
      setIsLoading(true);
      let searchVal =  tabSelected.index > 0 ? sections[tabSelected.index].id : sections[0].id;

      let userInput = {id: searchVal};

      props.postCategoryAction(userInput, GET_POST_BY_CATEGORY, BLOG_FRONTEND_URL)

      setIsLoading(false);

    } else setIsLoading(false);
  }, [tabSelected.index]);



  return (
    <div className={classes.root}>
      {/* <h4>Faqja kryesore</h4> */}
      <SectionsHeader sections={sections} title="test" />
      <main>
        <SnackbarNoInternet />
        {!isLoading && !isEmptyUtils(posts) ? (
          <>
            <FeaturedPost post={posts[0]} />
            <Posts posts={posts.filter((item, index) => index !== 0)} />{" "}
            {/* get all but not first item (because is used in FeaturedPost) */}
          </>
        ) : (
          <>
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
                  onClick={() => setErrors("")}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <Skeletons showFeaturedSkeleton />
          </>
        )}
        {/* <FullScreenPostDialog /> */}
      </main>
    </div>
  );
}
HomePage.propTypes = {
  loginUser: PropTypes.object.isRequired,
  postCategoryAction: PropTypes.func.isRequired,
    postAction: PropTypes.func.isRequired,
  postCategory: PropTypes.object.isRequired

};


const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        postCategory: state.postCategory
    }
}

export default connect(mapStateToProps, { postCategoryAction, postAction}) (withRouter(HomePage));