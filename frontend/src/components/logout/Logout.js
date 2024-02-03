import React, {Component} from 'react';
import PropTypes from 'prop-types';
import activateAction from "../../redux/signup/activateAction";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import logoutAction from "../../redux/logout/logoutAction";



class Logout extends Component {

    constructor(props) {
        super(props);

    }

    onLogoutClick = e => {
      this.props.logoutAction();
    };

    componentDidMount() {
        this.onLogoutClick()
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

Logout.propTypes = {
    logoutAction: PropTypes.func.isRequired,
};

export default connect(null, {logoutAction})(withRouter(Logout));
