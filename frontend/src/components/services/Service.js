import React from "react";
import "../../static /Service.css";
import logo from "../../img/logo.png";
import Navigation from "../home/Navigation";
import Avatar from "@material-ui/core/Avatar";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {HOME_URL} from "../../utils/Constant";

function Service() {

  const { t } = useTranslation();

  return (
      <div style={{backgroundColor: "#191919"}}>
        <div className="header d__flex align__items__center pxy__30">
                     <Link href={HOME_URL}>
                <Avatar  src={logo} />
            </Link>

          <Navigation/>
        </div>
        <div className="service component__space" id="Services">

          <div className="heading">
            <h1 className="heading">{t("service.tile")}</h1>
            <p className="heading p__color">
              {t("service.sub.tile")}
            </p>
          </div>

          <div className="container">
            <div className="row">
              <div className="col__3">
                <div className="service__box pointer">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                      <line x1="2" y1="20" x2="2" y2="20"></line>
                    </svg>
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">{t("service.strategy.consulting")}</h1>
                    <p className="p service__text p__color">
                      {t("service.strategy.consulting.content.one")}
                    </p>

                  </div>
                </div>
              </div>

              <div className="col__3">
                <div className="service__box pointer">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">{t("service.website.tile")}</h1>
                    <p className="p service__text p__color">
                      {t("service.website.content")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col__3">
                <div className="service__box pointer">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">{t("service.training.title")}</h1>
                    <p className="p service__text p__color">
                      {t("service.training.content")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
              <br/>
              <br/>

              <Typography variant="body2" style={{color:"white"}} align="center">
              {"Copyright © "}
              <Link  href="https://zekariashirpo.com/">
                Zekarias Taye Hirpo
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
      </div>
  );
}

export default Service;
