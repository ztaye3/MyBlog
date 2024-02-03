import React, {Component, useState} from 'react';
import {withRouter, Redirect, Link as RouterLink} from "react-router-dom";
import signupAction from "../../redux/signup/signupAction";
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
import Container from "@material-ui/core/Container";
import {Copyright} from "../../utils/StyleUtil";
import List from "@material-ui/core/List";
import {ListItem} from "@material-ui/core";
import {withTranslation} from "react-i18next";


class Signup extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            password : "",
            re_password: "",
            email : "",
            first_name : "",
            last_name : "",
            passwordMismatch: ""
        }
    }

    onChange = e => {

        const target = e.target;
        const  value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
    }

    onSignupClick = e => {
        e.preventDefault();
       if(this.state.re_password === this.state.password){
            const userInput = {
            password: this.state.password,
            re_password: this.state.re_password,
            email : this.state.email,
            first_name : this.state.first_name,
            last_name : this.state.last_name,

        }

        this.setState({passwordMismatch: "" })
        this.props.signupAction(userInput);

       }
       else {
           this.setState({
               passwordMismatch: "Password and Confirm password don't match"
           })
       }
    }

    render() {

        const flexContainer = {
          display: 'flex',
          flexDirection: 'row',
          padding: 0,
        };
        const classes = this.props.classes;
        const { t } = this.props;
        
        if (this.props.isAuthenticated) {
            return <Redirect to={HOME_URL} />
        }
        else if (this.props.signupUser.isSubmitted) {
            return (
                 <div className={classes.heroContent}>
                      <Container maxWidth="sm">
                        <Typography
                          component="h1"
                          variant="h2"
                          align="center"
                          color="textPrimary"
                          gutterBottom
                        >
                            {t("signUp.welcome.afropa")}
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          style={{color: 'white'}}
                          paragraph
                        >
                            {t("signUp.welcome.activation")} {this.state.email}
                        </Typography>
                        <div className={classes.heroButtons}>
                          <Grid container spacing={2} justify="center">
                            <Grid item>
                              <Button
                                component={RouterLink}
                                to={"/login"}
                                variant="contained"
                                color="primary"
                              >
                                  {t("login.text.signIn")}
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      </Container>
                    </div>
            )
        }
        else {
            return(
            
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
                            {t("signUp.signUp")}
                        </Typography>
                        <form className={classes.form} noValidate>

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label={t("checkout.firstName")}
                            name="first_name"
                            autoComplete="first_name"
                            onChange={this.onChange}
                            value={this.state.first_name}
                            autoFocus
                            error={this.props.signupUser.first_nameError.toString()}
                          />
                            <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.signupUser.first_nameError.toString()}
                            </Typography>

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label={t("checkout.lastName")}
                            name="last_name"
                            autoComplete="last_name"
                            onChange={this.onChange}
                            value={this.state.last_name}
                            autoFocus
                          />
                            <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.signupUser.first_nameError.toString()}
                            </Typography>

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
                            error={this.props.signupUser.emailError.toString()}
                            autoFocus
                          />
                            <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.signupUser.emailError.toString()}
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
                            autoComplete="password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={this.props.signupUser.passwordError.toString()}
                          />
                            <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.signupUser.passwordError.toString()}
                            </Typography>


                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="re_password"
                            label={t("login.text.confirmPassword")}
                            type="password"
                            id="re_password"
                            autoComplete="re_password"
                            onChange={this.onChange}
                            value={this.state.re_password}
                            onInvalid={this.props.signupUser.re_passwordError.toString()}
                          />
                           <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.props.signupUser.re_passwordError.toString()}
                           </Typography>
                           <Typography gutterBottom variant="h9" component="h5" color="error">
                            {this.state.passwordMismatch.toString()}
                           </Typography>


                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onSignupClick}
                          >
                            {t("signUp.signUp")}
                          </Button>
                          <Grid container>

                            <List style={flexContainer}>
                                <ListItem>
                                    <Grid item xs>
                                      <Link href="/login" variant="body2">
                                        {t("signUp.alreadyHaveAccount")}
                                      </Link>
                                    </Grid>
                                </ListItem>

                                <ListItem>
                                    <Grid item xs>
                                      <Link href="/" variant="body5">
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

        )
        }
    }
}

Signup.propTypes = {
  signupAction: PropTypes.func.isRequired,
  signupUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.any.isRequired

};

const mapStateToProps = state => ({
  signupUser: state.signupUser,
  isAuthenticated: state.loginUser.isAuthenticated
});

export default connect(mapStateToProps, {
  signupAction
})(withTranslation()(withRouter(UpdatedComponent(Signup))));