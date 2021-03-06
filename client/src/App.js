import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import { Provider } from "react-redux";
import store from "./reduxStore";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layouts/Navbar";
import HeroSection from "./components/layouts/Hero";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileActions";
import Footer from "./components/layouts/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/Credencials/add-experience";
import AddEducation from "./components/Credencials/add-education";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/404/notfound";
import Posts from "./components/posts/Posts";
import Post from "./components/singlePost/Post";
import "./App.css";

// check for jwt token on every page refresh
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  // store user data or info in the localStorage
  store.dispatch(setCurrentUser(decoded));

  // check for expired tokens
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout the user
    // clear user profile
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    // redirect user to login page
    window.location.href = "/Login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={HeroSection} />
            <div className="container">
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/notfound" component={NotFound} />
              <Switch>
                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post-feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
