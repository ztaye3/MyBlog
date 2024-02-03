import React, {Component, useState} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import loginUserAction from "../../redux/login/loginAction";
import {connect} from "react-redux";
import {DASHBOARD_URL} from "../../utils/Constant";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import UpdatedComponent from "../../utils/StyleUtil";
import { FormControl} from "react-bootstrap";
import {resetPassword} from "../../redux/login/loginAction";
import {Translation, withTranslation} from "react-i18next";

class ResetPassword extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: ""
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

     onSubmit = e => {
        e.preventDefault()
         this.props.resetPassword(this.state.email);
     }

    render() {
        const classes = this.props.classes;
        const { t } = this.props;
        function Copyright() {
          return (
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://zekariashirpo.com/">
                Zekarias Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          );
        }
        if(this.props.loginUser.isResetPasswordRequestSent){
            return (
                <div className='container mt-5'>
                    <h1>{t("resetPassword.message")}</h1>
                </div>
            )
        }

        return (

                 <Grid container component="main" className={classes.root}>
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
                            <Avatar className={classes.avatar}>
                              <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {t("resetPassword.rest")}
                            </Typography>
                            <form className={classes.form} noValidate>

                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={t("login.text.emailAddress")}
                                name="email"
                                autoComplete="email"
                                onChange={this.onChange}
                                value={this.state.email}
                                autoFocus
                              />

                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onSubmit}
                              >
                                {t("resetPassword.rest")}
                              </Button>
                              <Box mt={5}>
                                <Copyright />
                              </Box>
                            </form>
                          </Grid>
                    </Grid>
                  </Grid>
             </Grid>

        );
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser
    }
}

export default connect(mapStateToProps, {resetPassword}) (withTranslation()(withRouter(UpdatedComponent(ResetPassword))));
