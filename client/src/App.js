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
import Users from "./components/profile/Users";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/forms/CreateProfile";
import Questions from "./components/question/Questions";
import EditProfile from "./components/profile/forms/EditProfile";
import AskQuestion from "./components/question/forms/AskQuestion";
import EditQuestion from "./components/question/forms/EditQuestion";
import Question from "./components/question/Question";
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
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={Profile} />
            <ProtectedRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <ProtectedRoute
              exact
              path="/edit-profile/:id"
              component={EditProfile}
            />
            <Route
              exact
              path="/questions"
              render={props => <Questions {...props} />}
            />
            <ProtectedRoute
              exact
              path="/ask-question"
              component={AskQuestion}
            />
            <ProtectedRoute
              exact
              path="/edit-question/:id"
              component={EditQuestion}
            />
            <Route exact path="/questions/:id" component={Question} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
