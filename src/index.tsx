import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://a461a5c4a9b64e5192f437403e4f9752@sentry.io/1552559"
});

ReactDOM.render(<App />, document.getElementById("root"));
