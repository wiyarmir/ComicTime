import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Raven from "raven-js";
import registerServiceWorker from "./registerServiceWorker";
import { productionEnvironment } from "./utils/environmentUtils";

initializeSentry();
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

function initializeSentry() {
  if (!productionEnvironment()) {
    return;
  }
  const sentryKey = process.env.REACT_APP_SENTRY_KEY;
  Raven.config(sentryKey).install();
}
