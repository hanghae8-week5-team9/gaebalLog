import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import configstore from "./redux/config/configstore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={configstore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
