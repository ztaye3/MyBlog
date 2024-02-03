import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import postCategoryAction from "../../redux/admin/category/postCategoryAction";
import postAction from "../../redux/post/postAction";
import {withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import {isEmptyUtils} from "../../utils/Utils";
import commentAction from "../../redux/comment/commentAction";
import {ADD_COMMENT, NO_DISPATCH} from "../../utils/Constant";

const useStyles = makeStyles(theme => ({
   form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  },
    submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddComment  (props)  {

  const classes = useStyles();
  const { t } = useTranslation();

  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const post = props.post;

  const onChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      
      if (name === "name"){
          setName(value)
      }
      else if (name === "comment"){
          setComment(value)
      }  
      
  };

  const addComment = () => {



      if (!isEmptyUtils(comment)){
          const userInput = {
              slug: props.post.slug,
              content: comment,
              is_displayed: true,
              created_by: isEmptyUtils(name) ? "Unknown" : name
          }

          props.commentAction(userInput, ADD_COMMENT, NO_DISPATCH)

      }

  }
  
  return (
    <div className={classes.root}>

                                <form className={classes.form} noValidate>

                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="comment"
                                        label={t("comment.comment")}
                                        name="comment"
                                        autoComplete="comment"
                                        onChange={onChange}
                                        value={comment}

                                      />

                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label={t("comment.name")}
                                        name="name"
                                        autoComplete="name"
                                        onChange={onChange}
                                        value={name}

                                      />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        style={{backgroundColor:"orange"}}
                                        className={classes.submit}
                                        onClick={addComment}
                                      >
                                  {t("comment.comment")}
                              </Button>
                                </form>
    </div>
  );
};

AddComment.propTypes = {
  loginUser: PropTypes.object.isRequired,
  postCategoryAction: PropTypes.func.isRequired,
    postAction: PropTypes.func.isRequired,
  postCategory: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  commentAction: PropTypes.func.isRequired

};


const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        postCategory: state.postCategory,
        post: state.blogStore.post
    }
}

export default connect(mapStateToProps, { postCategoryAction, postAction, commentAction}) (withRouter(AddComment));