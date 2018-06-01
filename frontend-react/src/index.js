import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";

//Importing Redux Libraries
import thunk from "redux-thunk";
import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import boatReducerState from "./reducers/boatReducer";
import tripReducerState from "./reducers/tripReducer";

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
);

const allReducers = combineReducers({
  user: userReducer,
  admin: adminReducer,
  boats: boatReducerState,
  trip: tripReducerState
});

const store = createStore(allReducers, allStoreEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
