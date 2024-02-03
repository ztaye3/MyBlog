import React from "react";
import {AUTH_LOGIN_REDIRECT_URL} from "./Constant";
import {push} from "connected-react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";


export default function authentication(CurrentComponent){
     class AuthenticatedComponent extends React.Component{

        constructor(props) {
            super(props);
            // Check if user is already authenticated
            this.checkAuth();
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            // Check if user is already authenticated
            this.checkAuth()
        }

        checkAuth(){
            // If user is not authenticated, redirect to login page
            if (!this.props.isAuthenticated){
                const redirect = this.props.location.pathname;
                this.props.dispatch(push(AUTH_LOGIN_REDIRECT_URL + redirect));
            }
        }

        // If user is authenticated, render the component
        render() {
            return(
                <div>
                    {(this.props.isAuthenticated === true && this.props.isAdmin === true) ? (
                        <CurrentComponent {...this.props}/>
                    ) : null}
                </div>
            )
        }

    }

AuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    // location is a 'router' store
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.loginUser.isAuthenticated,
            isAdmin: state.loginUser.user.is_admin,
            access: state.loginUser.access
        }
    }

    return connect(mapStateToProps) (AuthenticatedComponent)
}