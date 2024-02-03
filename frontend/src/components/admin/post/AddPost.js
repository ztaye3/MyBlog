import {isMobile} from "react-device-detect";
import React, {Component} from 'react';
import {useParams, withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DriveIcon from "@material-ui/icons/DriveEta";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {connect, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import {
    Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    ListItem,
    MenuItem,
    NativeSelect,
    Select,
    TextareaAutosize
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Copyright} from "../../../utils/StyleUtil";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardContent from "@material-ui/core/CardContent";
import background from '../../../static /background/admin_two.jpg'
import addUserAction from '../../../redux/admin/user/addUserAction'
import {isEmptyUtils} from "../../../utils/Utils";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {
    ADD_MANAGE_USER_URL,
    ADD_POST, ADD_POST_URL,
    GET_COMMENT, GET_POST_CATEGORY,
    MANAGE_COMMENT_URL, MANAGE_POST_CATEGORY_URL,
    MANAGE_POST_URL,
    MANAGE_USER_URL
} from "../../../utils/Constant";
import FormHelperText from "@material-ui/core/FormHelperText";
import postAction from "../../../redux/post/postAction";
import postCategoryAction from "../../../redux/admin/category/postCategoryAction";




const styles = theme => ({

        dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
 image: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar2: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  avatar3: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

 formControl: {
        marginTop: theme.spacing(2),

  },
 headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  MenuItem: {
        color: "textSecondary",
        fontSize: "100%"
  }
});

class AddPost extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile_picture: null,
            title : "",
            excerpt: "",
            content : "",
            category : null,
            status : "",
            imagePreview: null,
            postDialog: false
        }
    }

    componentDidMount() {
        this.props.postCategoryAction(null, GET_POST_CATEGORY, ADD_POST_URL)
    }
    onChange = e => {

        e.preventDefault();
        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });

        // Set image
       if(e.target.files != null){
            this.setState({
          profile_picture: e.target.files[0],
          imagePreview: URL.createObjectURL(e.target.files[0]),

        });
        }
    }

    openDialog = e => {
        this.setState({
            postDialog: true
        })
     }

     closeDialog = e => {
        this.setState({
            postDialog: false
        })
     }
    onAddUser = () => {

           const input = [];
           let categoryTemp = this.props.postCategory.postCategory[0].name;

           const email = this.props.loginUser.user.email;
           const category = null !== this.state.category ? this.state.category : categoryTemp;

           const userInput = {
                                    title : this.state.title ,
                                    excerpt: this.state.excerpt,
                                    content : this.state.content,
                                    status: this.state.status,
                                    image: this.state.profile_picture,
                                    created_by: "",
                                    category: "",
                                    }

           // set values
           input[0] = email;
           input[1] = category;
           input[2] = userInput;

           this.props.postAction(input, ADD_POST, MANAGE_POST_URL);

    }

    render() {
        const { classes } = this.props;
        const { t } = this.props;

        function Copyright() {
          return (
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          );
        }

        return (
            <div style={{backgroundColor:"#000000"}}>

                <div
                    style={{
                      height: "200px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      filter: "contrast(75%)",
                      backgroundImage: "url(/img/wallpaper.jpeg)",
                    }}
                  />
                  <div className={classes.headerContainer}>
                    <div className={classes.header}>
                      <Avatar
                        alt={"Admin"}
                        src={this.props.loginUser.user.profile_picture}
                        classes={{ root: classes.avatar, circle: classes.circle }}
                      />
                      <Typography variant={"h5"}>{this.props.loginUser.user.first_name}</Typography>
                      <Chip variant={"outlined"} icon={<SupervisorAccountIcon />} label={t("admin.admin")} />
                      {!isMobile && (<Rating name="read-only" value={4.3} readOnly />)}
                      <div className={classes.spacer} />
                    </div>
                  </div>


                <CssBaseline />
                  <Grid container justify="center" className={classes.image}>
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      md={5}
                      component={Paper}
                      direction="row"
                      elevation={6}
                      square
                    >
                      <Grid className={classes.paper}>
                        <Avatar >
                          <AddCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {t("admin.managePost.add")}
                        </Typography>
                        <form className={classes.form} noValidate>

                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label={t("admin.managePost.title")}
                                name="title"
                                autoComplete="title"
                                onChange={this.onChange}
                                value={this.state.title}

                              />

                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="excerpt"
                                label={t("admin.managePost.excerpt")}
                                name="excerpt"
                                autoComplete="excerpt"
                                onChange={this.onChange}
                                value={this.state.excerpt}

                              />

                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                label={t("admin.managePost.content")}
                                onChange={this.onChange}
                                onClick={this.openDialog}
                                placeholder={this.state.content !== "" ? this.state.content: "Want to post something..."}
                              />
                              <Dialog open={this.state.postDialog} onClose={this.closeDialog}
                                                aria-labelledby="form-dialog-title"
                                                fullWidth
                                                maxWidth="sm"
                                  classes={{ paper: classes.dialogPaper }}
                              >
                                            <DialogTitle id={"form-dialog-title"}>t{("admin.managePost.content")}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText/>
                                                <TextareaAutosize
                                                            value={this.state.content}
                                                             variant="standard"
                                                            id="content"
                                                            name="content"
                                                            autoComplete="content"
                                                            label={"Content"}
                                                            // fullWidth
                                                             onChange={this.onChange}
                                                            minRows={3}
                                                            maxRows={8}
                                                            placeholder={"Body"}
                                                            style={{backgroundColor: "white",
                                                            // borderRadius: "10%",
                                                            width: "100%",
                                                            border: "none",
                                                                outlineColor: "green"

                                                            }}
                                                            InputProps={{

                                                            disableUnderline: true,
                                                          }}
                                                          />
                                            </DialogContent>

                                            <DialogActions>
                                                  <Button onClick={this.closeDialog} style={{backgroundColor:"orange"}}>
                                                      {t("admin.managePost.submit")}
                                                  </Button>
                                                </DialogActions>
                                        </Dialog>
                            <br/>
                            <br/>
                            <FormControl className={classes.formControl}>
                                {/*<InputLabel htmlFor="uncontrolled-native">Product Type</InputLabel>*/}
                                <NativeSelect
                                    value={this.state.category}
                                  onChange={this.onChange}
                                  name="category"
                                  defaultValue={this.state.category}
                                  inputProps={{
                                    name: 'category',
                                    id: 'category',
                                  }}
                                >
                                    {
                                        this.props.postCategory.postCategory.map((category, index) => (
                                            <option value={category.name}>{category.name}</option>
                                            ))
                                    }

                            </NativeSelect>
                                <FormHelperText>{t("admin.managePost.category")}</FormHelperText>

                            </FormControl>

                            <br/>
                            <br/>
                            <FormControl className={classes.formControl}>
                                                        <Typography
                                                                color={"textSecondary"}
                                                                margin="dense"
                                                                id="status"
                                                                name="status"
                                                                label="status"
                                                                fullWidth
                                                        >{t("admin.managePost.status")}</Typography>
                                                        <Select
                                                          labelId="demo-simple-select-label"
                                                          id="status"
                                                          name="status"
                                                          value={this.state.status}
                                                          onChange={this.onChange}
                                                          className={classes.MenuItem}
                                                        >
                                                          <MenuItem className={classes.MenuItem} value={"draft"}>{t("admin.managePost.draft")}</MenuItem>
                                                          <MenuItem className={classes.MenuItem} value={"published"}>{t("admin.managePost.published")}</MenuItem>
                                                        </Select>
                              </FormControl>

                             <CardContent>
                                      <Grid container justify="center" alignItems="center">
                                        {this.state.imagePreview&& (
                                        <div style={{paddingRight: '2%'}}>
                                         <Avatar
                                        alt={"Profile picture"}
                                        src={this.state.imagePreview}
                                        classes={{ root: classes.avatar2, circle: classes.circle }}
                                      />
                                        </div>
                                         )}
                                          <input
                                          accept="image/*"
                                          style={{display: "none"}}
                                          id="contained-button-file"
                                          multiple
                                          type="file"
                                          onChange={this.onChange}
                                        />

                                        <label htmlFor="contained-button-file">
                                            <Typography color={"textSecondary"}>Photo</Typography>
                                          <Fab component="span" className={classes.button}>
                                            <CloudUploadIcon style={{color: "orange"}}/>
                                          </Fab>
                                        </label>
                                      </Grid>
                             </CardContent>

                              <Button
                                fullWidth
                                variant="contained"
                                style={{color:"orange"}}
                                className={classes.submit}
                                onClick={this.onAddUser}
                              >
                                  {t("admin.managePost.add")}
                              </Button>


                        </form>
                      </Grid>
                </Grid>
              </Grid>
                 <Box mt={5}>
                            <Copyright />
                 </Box>
            </div>
        );
    }
}

AddPost.propTypes = {
  addUserAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
  userAdmin: PropTypes.object.isRequired,
  postAction: PropTypes.func.isRequired,
    postCategory: PropTypes.object.isRequired,
  postCategoryAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        productAdmin: state.productAdmin,
        userAdmin: state.userAdmin,
        loginUser: state.loginUser,
         postCategory: state.postCategory
    }
}

export default connect(mapStateToProps, {postAction, addUserAction, postCategoryAction})(withTranslation()(withStyles(styles) (withRouter(AddPost))));
