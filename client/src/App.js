import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
// Components
import ProtectedRoute from "./Routing/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
// CSS
import "./App.css";
// Actions
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
