import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import "./post-component.css";
import { ToDateTime } from '../../utils/functions';
import {
  BLOG_FRONTEND_URL,
  GET_POST_BY_CATEGORY,
  GET_POST_CATEGORY,
  GET_SINGLE_POST_DETAIL,
  NO_DISPATCH
} from "../../utils/Constant";
import {connect} from "react-redux";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import postAction from "../../redux/post/postAction";
import {withRouter} from "react-router-dom";
import {isEmptyUtils} from "../../utils/Utils";
import AddComment from "../comment/AddComment";
import Comments from "../comment/Comments";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: 320
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    margin: 40,
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10),
      paddingRight: 0,
    },
  },
  buttonsDiv: {
    margin: 5,
  },
  buttons: {
    marginRight: 15,
  },
}));
function FeaturedPost(props) {
  const classes = useStyles();
  const { t }  = useTranslation();

      /**
     * Component did mount
     * Fetch post detail
     */
    useEffect(() => {

        if(isEmptyUtils(props.post)){
          const {slug} = props.match.params;

          const userInput = {slug: slug}

          // Get post details
          props.postAction(userInput, GET_SINGLE_POST_DETAIL, NO_DISPATCH)
        }

    }, []);


    if(!isEmptyUtils(props.post)){
          return (
    <main>
      <Paper
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `url(${props.post.image})` }}
      >
      </Paper>
      <Divider />
      <Grid item xs={12} md={9}>
        <Typography variant="h5" gutterBottom style={{ padding: 10 }}>
          {props.post.title}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" className={classes.buttonsDiv}>
          <Button
            variant="outlined"
            size="small"
            className={classes.buttons}
            href={""}
            target="_blank"
            style={{textTransform:"capitalize"}}
          >
            <Typography variant="h6" style={{textTransform:"capitalize"}}>{t('post.by')} {props.post.created_by.first_name + " " + props.post.created_by.last_name}</Typography>
          </Button>
          {/* <IconButton
            className={classes.buttons}
            aria-label="Facebook"
            component="span"
            size="small"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            className={classes.buttons}
            aria-label="WhatsApp"
            component="span"
            size="small"
          >
            <WhatsAppIcon />
          </IconButton> */}
            <i style={{fontSize: 12}}>{ToDateTime(props.post.created_date)}</i>
        </Typography>
        <br/>
        <Divider />
        <Typography
          variant="body1"
          className={"description"}
          dangerouslySetInnerHTML={{ __html: props.post.content }}
        ></Typography>
      </Grid>

      {!isEmptyUtils(props.post.comments_list) && (
         <Divider />
      )}
      {!isEmptyUtils(props.post.comments_list) && (
        <Comments comments={props.post.comments_list}/>
      )}
      <Divider />
      <AddComment/>
    </main>
  );

    }
    else {
      return (
          <div></div>
      )
    }
}

FeaturedPost.propTypes = {
  loginUser: PropTypes.object.isRequired,
  postCategoryAction: PropTypes.func.isRequired,
    postAction: PropTypes.func.isRequired,
  postCategory: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired

};


const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        postCategory: state.postCategory,
        post: state.blogStore.post
    }
}

export default connect(mapStateToProps, { postCategoryAction, postAction}) (withRouter(FeaturedPost));