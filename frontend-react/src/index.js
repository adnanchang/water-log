import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//Importing Redux Libraries
import thunk from "redux-thunk";
import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
);

const allReducers = combineReducers({
});

const store = createStore(allReducers, allStoreEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
