import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <Provider store={store}>
      <App />
    </Provider>
>>>>>>> upstream/master
  </React.StrictMode>,
  document.getElementById("root")
);

<<<<<<< HEAD
// If you want your app to work offline and load faster, you can change
=======
// If you want your redux to work offline and load faster, you can change
>>>>>>> upstream/master
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
