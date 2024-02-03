import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { DateFromNow, ShareAPI } from "../../utils/functions";
import { Delete } from "@material-ui/icons";
import { GetValue, SaveValue } from "../../services/storageService";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { SavePost } from "../../services/storageService";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarNotify from "../snackbar-notify-component";
import {connect, useDispatch} from "react-redux";
import { setPost } from "../../redux/actions/actions";
import {Redirect, withRouter} from 'react-router-dom';
import {BLOG_FRONTEND_URL, BLOG_POST_FRONTEND_URL, UPDATE_POST_LIKE} from "../../utils/Constant";
import { useHistory } from "react-router-dom";
import {push} from "connected-react-router";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import postAction from "../../redux/post/postAction";
import commentAction from "../../redux/comment/commentAction";
import {isEmptyUtils} from "../../utils/Utils";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles({
  cardContent: {
    padding: "10px 8px 0 10px",
  },
});

 function SinglePost(props) {
  const classes = useStyles();
  const { post, showDelete, handleDelete } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbarNotify, setOpenSnackbarNotify] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()

  // const handlePost = (post) => dispatch(setPost(post));

  const handlePost = (slug) => {
    console.log(slug)
    dispatch(push(BLOG_POST_FRONTEND_URL + slug))
    }

  
  const handleDeletePost = () => {
    const posts = GetValue("savedPost");
    if (posts) {
      const otherPosts = posts.filter(
        (item) => item.originalLink !== post.originalLink
      );
      SaveValue("savedPost", otherPosts);
      handleDelete(post); //to refresh the post list in parent component
    }
  };

  const handleSavePost = () => {

    const like_count_prev = isEmptyUtils(post.updated_by) ? 0 : post.updated_by;

    const like_count = Number(like_count_prev) + 1
    const userInput = {
      like_count: like_count,
      id: post.id
    }

    props.postAction(userInput, UPDATE_POST_LIKE, BLOG_FRONTEND_URL)

  };

  const handleShare = () => {
    setOpenSnackbarNotify(true);
    setTimeout(() => {
      setOpenSnackbarNotify(false);
    }, 2000);
  };

  return (
    <>
      {openSnackbarNotify && (
        <SnackbarNotify message="Post url copied to clipboard!" />
      )}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardActionArea>
            {/* <CardActionArea component="a" href="#"> */}
            {/* <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden>
        </Card> */}
            <CardMedia
              component="img"
              alt={"loading"}
              height="140"
              image={post.image}
              title={"loading"}
            />
            <CardContent
               onClick={e => {
                        e.preventDefault();
                        window.location.href = BLOG_POST_FRONTEND_URL + post.slug;
                      }}
              className={classes.cardContent}
            >
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                dangerouslySetInnerHTML={{
                  __html:
                    post.excerpt.split(" ").splice(0, 20).join(" ") + "...",
                }}
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid container justify="space-between">
              <Grid item>
                <i style={{ marginRight: 20 }}>{DateFromNow(post.created_date)}</i>

                {/* <IconButton
                color="primary"
                aria-label="WhatsApp"
                component="span"
                size="small"
              >
                <WhatsAppIcon />
              </IconButton> */}

                {/* <Button
                size="small"
                color="primary"
                // onClick={() => history.push({ pathname: post.link, state: { post } })}
                onClick={() => handlePost(post)}
              >
                Vazhdo leximin...
              </Button> */}
              </Grid>

              <Grid item>

                  <IconButton
                  color="primary"
                  aria-label="Ruaj"
                  component="span"
                  size="small"
                  style={{ marginRight: 10 }}
                                >
                                    {post.updated_by}
                  </IconButton>

                <IconButton
                  color="primary"
                  aria-label="Ruaj"
                  component="span"
                  onClick={handleSavePost}
                  size="small"
                  style={{ marginRight: 10 }}

                >
                  <FavoriteIcon style={{color:"#ff9800"}}/>
                </IconButton>
                {!isEmptyUtils(props.post) && (
                <CopyToClipboard text={window.location.hostname + BLOG_POST_FRONTEND_URL + post.slug} onCopy={handleShare}>
                    <IconButton
                      color="primary"
                      aria-label="Share"
                      component="span"
                      size="small"
                      onClick={handleShare}
                    >
                      <ShareIcon style={{color:"#ff9800"}}/>
                    </IconButton>
                </CopyToClipboard>
                )}

                {showDelete && (
                  <IconButton
                    color="secondary"
                    aria-label="Fshi postimin"
                    component="span"
                    size="small"
                    onClick={() => setOpenDialog(true)}
                    style={{ marginLeft: 10 }}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>

      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Jeni të sigurtë për fshirjen e këtij postimi?"}
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={() => setOpenDialog(false)}>
            Jo
          </Button>
          <Button onClick={handleDeletePost} color="primary" autoFocus>
            Po
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SinglePost.propTypes = {
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

export default connect(mapStateToProps, { postCategoryAction, postAction, commentAction}) (withRouter(SinglePost));