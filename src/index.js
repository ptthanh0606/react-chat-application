import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./views/App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer position={"bottom-left"} className="font-weight-bold" />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
