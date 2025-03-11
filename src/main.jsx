//?---------------------------- IMPORTS --------------------------------
//react
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//redux
import store from "./redux/Store/Store.js";
//archivos
import App from "./App.jsx";

//css
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//?----------------- APP ------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
