import React, {useState} from 'react';
import '../../static /Contact.css';
import contactImg from "../../img/about-9.jpg"
import logo from "../../img/logo.png";
import Navigation from "../home/Navigation";
import {useTranslation, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import addUserAction from "../../redux/admin/user/addUserAction";
import personalAction from "../../redux/admin/personal/personalAction";
import {withRouter} from "react-router-dom";
import {CONTACT_FRONTEND_URL, HOME_URL, SEND_CONTACT_EMAIL} from "../../utils/Constant";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
function Contact(props) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const onChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        if (name === "email")
            setEmail(value)
        else if(name === "name")
            setName(value)
        else if(name === "message")
            setMessage(value)
        else
            setSubject(value)
    }

    const sendEmail = e => {

        let userInput  = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }

        props.personalAction(userInput, SEND_CONTACT_EMAIL,CONTACT_FRONTEND_URL)
    }
    return (
        <div style={{backgroundColor: "#191919"}}>
            <div className="header d__flex align__items__center pxy__30">
                           <Link href={HOME_URL}>
                <Avatar  src={logo} />
            </Link>

              <Navigation/>
            </div>
            <div className="contact component__space" id="Contact">
                <div className="row">
                    <div className="col__2">
                        <div className="contact__box">
                            <div className="contact__meta">
                                <h1 className="hire__text">{t("contact.contactMe")}</h1>
                               {/* <p className="hire__text white"> {t("contact.phone")} <strong> +41 76 269 23 16</strong> </p>*/}
                               {/*<p className="hire__text white">{t("contact.email")} <strong>ztaye3@gmail.com</strong></p>*/}
                            </div>
                            <div className="input__box">
                               <input type="text" className="contact name" placeholder={t("contact.name")} name="name" onChange={onChange}/>
                               <input type="text" className="contact email" placeholder={t("contact.yourEmail")} name="email" onChange={onChange}/>
                               <input type="text" className="contact subject" placeholder={t("contact.subject")} name="subject" onChange={onChange}/>
                               <textarea name="message" id="message" placeholder={t("contact.message")} name="message" onChange={onChange}></textarea>
                               <button className="btn contact pointer" type="submit" onClick={sendEmail}>{t("contact.submit")}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col__2">
                        <img src={contactImg} alt="" className="contact__img" />
                    </div>
                </div>
            </div>
            <Typography variant="body2" style={{color:"white"}} align="center">
              {"Copyright © "}
              <Link  href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
        </div>
    )
}

Contact.propTypes = {
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

export default connect(mapStateToProps, {addUserAction, personalAction})(withTranslation()(withRouter(Contact)));
