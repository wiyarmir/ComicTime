import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import Raven from "raven-js";
import registerServiceWorker from "./registerServiceWorker";
import { productionEnvironment } from "./utils/environmentUtils";
import WebFont from "webfontloader";
import "normalize.css";
import { comicTimeStore } from "./app/comictTime";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import comicTimeTheme from "./theme";

initializeFonts();
initializeSentry();
renderApplication();
registerServiceWorker();

function initializeSentry() {
  if (!productionEnvironment()) {
    return;
  }
  const sentryKey = process.env.REACT_APP_SENTRY_KEY;
  Raven.config(sentryKey).install();
}

function initializeFonts() {
  WebFont.load({
    google: {
      families: ["Roboto:400", "sans-serif"]
    }
  });
}

function renderApplication() {
  ReactDOM.render(
    <Provider store={comicTimeStore}>
      <MuiThemeProvider muiTheme={comicTimeTheme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
}
