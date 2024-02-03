import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import { Slide } from "@material-ui/core";
import FeaturedPost from "./post-component";
import { Container, Fab } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import { SavePost } from "../../services/storageService";
import { ShareAPI } from "../../utils/functions";
import SnackbarNotify from '../snackbar-notify-component';
import {BLOG_FRONTEND_URL, BLOG_POST_FRONTEND_URL, UPDATE_POST_LIKE} from "../../utils/Constant";
import {isEmptyUtils} from "../../utils/Utils";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import postAction from "../../redux/post/postAction";
import commentAction from "../../redux/comment/commentAction";
import {withRouter} from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function FullScreenPostDialog(props) {
  const classes = useStyles();
  const [openSnackbarNotify, setOpenSnackbarNotify] = useState(false);

  const handleClose = () => {
    props.handlePost(null);
  };

  const handleSavePost = () => {

    const like_count_prev = isEmptyUtils(props.post.updated_by) ? 0 : props.post.updated_by;

    const like_count = Number(like_count_prev) + 1
    const userInput = {
      like_count: like_count,
      id: props.post.id
    }

    props.postAction(userInput, UPDATE_POST_LIKE, BLOG_POST_FRONTEND_URL + props.post.slug)

  }

  const handleShare = () => {
    setOpenSnackbarNotify(true);
    setTimeout(() => {
      setOpenSnackbarNotify(false);
    }, 2000);
  }

  let open = !!props.post;

  return (
    <div>
      {openSnackbarNotify && (
        <SnackbarNotify message="Post url copied to clipboard!" />
      )}
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={e => {
                        e.preventDefault();
                        window.location.href = BLOG_FRONTEND_URL;
                      }}
        TransitionComponent={Transition}
      >
        {/* <AppBar className={classes.appBar}>
          <Toolbar className={classes.title}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar> */}
        <br />
        <br />
        <Container>
          {props.post && <FeaturedPost post={props.post} />}
          <Divider />
            {props.post && (
                <IconButton
                className={classes.buttons}
                aria-label="ruaj"
                component="span"
                // size="large"
                >
                    {props.post.updated_by}
                </IconButton>
            )}
          <IconButton
            className={classes.buttons}
            aria-label="ruaj"
            component="span"
            onClick={handleSavePost}
            // size="large"
          >

            <FavoriteBorderIcon fontSize="large" style={{color:"#ff9800"}}/>
          </IconButton>

            {!isEmptyUtils(props.post) && (
                <CopyToClipboard text={window.location.hostname + BLOG_POST_FRONTEND_URL + props.post.slug} onCopy={handleShare}>
                  <IconButton
                    className={classes.buttons}
                    aria-label="Share"
                    component="span"
                    // size="large"
                  >
                    <ShareIcon fontSize="large" style={{color:"#ff9800"}}/>
                  </IconButton>
             </CopyToClipboard>
            )}


          <Divider />
          <br /> <br />
          <Fab
            aria-label={"test"}
            className={classes.fab}
            color="primary"
            onClick={e => {
                        e.preventDefault();
                        window.location.href = BLOG_FRONTEND_URL;
                      }}
            // size="small"
          >
            <CloseIcon />
          </Fab>
        </Container>
      </Dialog>
    </div>
  );
}

FullScreenPostDialog.propTypes = {
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

export default connect(mapStateToProps, { postCategoryAction, postAction, commentAction}) (withRouter(FullScreenPostDialog));
