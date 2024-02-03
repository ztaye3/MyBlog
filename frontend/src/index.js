import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import "react-toastify/dist/ReactToastify.css";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CookiesProvider} from "react-cookie";



// I18nNext language localization
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)

    supportedLngs: ["en", "fr", "it", "de", "am", "ti", "ar"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },

    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    },
    caches: ['localStorage', 'cookie'],

  backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
  },

  });

const loadingMarkup = (
    <div>
        <h2 style={{color: "orange"}}>
            Loading ...
        </h2>
    </div>
            )

    ReactDOM.render(
        <Suspense fallback={loadingMarkup}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Suspense>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
