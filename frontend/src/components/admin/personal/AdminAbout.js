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
import {Translation, withTranslation} from "react-i18next";
import Link from "@material-ui/core/Link";
import MaterialTable from "@material-table/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import {ListItem, MenuItem, Select, TextareaAutosize} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Copyright} from "../../../utils/StyleUtil";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardContent from "@material-ui/core/CardContent";
import background from '../../../static /background/admin_two.jpg'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import addUserAction from "../../../redux/admin/user/addUserAction";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {
ABOUT_URL, ABOUT_ADD_URL, ABOUT_PERSONAL_URL, PROJECT_URL, PROJECT_ADD_URL, MANAGE_ABOUT_FRONTEND_URL
    , MANAGE_PROJECT_FRONTEND_URL, ADD_ABOUT_FRONTEND_URL, ADD_PROJECT_FRONTEND_URL,
    ADD_ABOUT, UPDATE_ABOUT, GET_ABOUT, DELETE_ABOUT, ADD_PROJECT, UPDATE_PROJECT, GET_PROJECT, DELETE_PROJECT,
} from "../../../utils/Constant";
import {isMobile} from "react-device-detect";
import personalAction from "../../../redux/admin/personal/personalAction";





const styles = theme => ({

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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
        fontSize: "80%"
  }
});

class AdminAbout extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }


    onChange = e => {

        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });

        // Set image
       if(e.target.files != null){
            this.setState({
          image: e.target.files[0],
          imagePreview: URL.createObjectURL(e.target.files[0]),

        });
        }
    }

    editCategory = data => {
        this.props.personalAction(data, UPDATE_ABOUT, MANAGE_ABOUT_FRONTEND_URL)
    }

    deleteCategory = data => {
       this.props.personalAction(data, DELETE_ABOUT, MANAGE_ABOUT_FRONTEND_URL)
    }

    componentDidMount() {
        this.props.personalAction(null, GET_ABOUT, MANAGE_ABOUT_FRONTEND_URL)
    }

    render() {
        const { classes } = this.props;
        const data = this.props.personal.about;
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

        let host = window.location.hostname;

        // Check dev and production host
        if(host === "localhost" || host === "0.0.0.0"){
            host = "http://" + host;
        }

        else {
            host = "https://" + host;
        }

        return (
            <div>
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

                <Grid container justify="flex-end">
                     <Button
                      color="primary"
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      href={ADD_ABOUT_FRONTEND_URL}
                    >
                         {t("personal.about.addAbout")}
                    </Button>
                </Grid>



                <div style={{ maxWidth: "100%"}}>

                    <MaterialTable
                                  icons={{
                                    Edit: () => <EditIcon style={{ color: "green" }} />,
                                    Delete: () => <DeleteIcon style={{ color: "red" }} />
                                  }}
                         options={{
                            filtering: true,
                            search: true,


                          }}
                          title={t("personal.about.manageAbout")}
                          columns={
                              [

                                { title: 'Id', field: 'id', type: 'numeric', editable: 'never' },
                                { title: t("personal.about.content"), field: 'content' },
                                  { title: t("personal.isDisplayed"), field: 'is_displayed',
                                                                       type: "boolean",
                                    render: data => (data.is_displayed ? "True" : "False")
                                  },
                          ]
                          }
                          data={data}
                          editable={{
                            // onRowAdd: newData =>
                            //   new Promise((resolve, reject) => {
                            //     setTimeout(() => {
                            //       setData([...data, newData]);
                            //
                            //       resolve();
                            //     }, 1000)
                            //   }),
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataUpdate = [...data];
                                  const index = oldData.tableData.id;
                                  dataUpdate[index] = newData;
                                    this.editCategory(newData);

                                  resolve();
                                }, 1000)
                              }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataDelete = [...data];
                                  const index = oldData.tableData.id;
                                  // dataDelete.splice(index, 1);
                                  this.deleteCategory(dataDelete[index]);

                                  resolve();
                                }, 1000)
                              }),
                          }}
                        />
                  </div>

                 <Box mt={5}>
                     <Copyright />
                 </Box>

            </div>
        );
    }
}

AdminAbout.propTypes = {
  addUserAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  personalAction: PropTypes.func.isRequired,
  postCategory: PropTypes.object.isRequired,
    personal: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser,
        users: state.userAdmin.users,
        postCategory: state.postCategory,
        personal: state.personal
    }
}

export default connect(mapStateToProps, {addUserAction, personalAction})(withTranslation()(withStyles(styles) (withRouter(AdminAbout))));




