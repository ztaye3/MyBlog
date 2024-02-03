import React, {Component, useState} from 'react';
import {withRouter, Redirect} from "react-router-dom";
import loginUserAction from "../../redux/login/loginAction";
import {connect} from "react-redux";
import {DASHBOARD_URL, HOME_URL} from "../../utils/Constant";
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
import {Copyright} from "../../utils/StyleUtil";
import {ListItem} from "@material-ui/core";
import List from "@material-ui/core/List";
import {Translation, withTranslation} from "react-i18next";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""}
    }

    onChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onLoginClick = e =>{
        e.preventDefault();
        const userInput = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUserAction(userInput, HOME_URL)
    }
    render() {
        const classes = this.props.classes;
        const { t } = this.props;
        const flexContainer = {
          display: 'flex',
          flexDirection: 'row',
          padding: 0,
        };


        if (this.props.loginUser.isAuthenticated) {
        return <Redirect to={HOME_URL} />
            }
        return (

            <Grid container component="main" className={classes.root}>
                <div style={{ flexGrow: 0.8 }}/>
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
                            {t("login.text.signIn")}
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
                            error={this.props.loginUser.emailError.toString()}
                            autoFocus
                          />
                            <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.loginUser.emailError.toString()}
                            </Typography>

                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t("login.text.password")}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={this.props.loginUser.passwordError.toString()}

                          />
                          <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.loginUser.passwordError.toString()}
                          </Typography>

                          <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label={t("login.rememberMe")}
                          />
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onLoginClick}
                          >
                            {t("login.text.signIn")}
                          </Button>
                          <Grid container>

                            <List style={flexContainer}>
                                <ListItem>
                                    <Grid item xs>
                                      <Link href="/reset-password" variant="body2">
                                          {t("login.forgotPassword")}
                                      </Link>
                                    </Grid>
                                </ListItem>

                                <ListItem>
                                    <Grid item>
                                      <Link href="/signup" variant="body2">
                                        {t("login.dontHaveAccount")}
                                      </Link>
                                    </Grid>

                                </ListItem>

                                <ListItem>
                                    <Grid item xs>
                                      <Link href="/" variant="body2">
                                          {t("login.goBack")}
                                      </Link>
                                    </Grid>
                                </ListItem>
                            </List>

                          </Grid>
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

Login.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        loginUser: state.loginUser
    }
}

export default connect(mapStateToProps, {loginUserAction}) (withTranslation()(withRouter(UpdatedComponent(Login))));