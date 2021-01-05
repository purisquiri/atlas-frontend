import React, { Component } from "react";
import HomeContainer from "./containers/HomeContainer";

import SignIn from "./containers/LoginContainer";
import SignUp from "./containers/SignUpContainer";
import { Route, Redirect } from "react-router-dom";
import Globe from "./components/Globe";
import Cover from "./components/Cover";
import Reviews from "./containers/Reviews";
import "./App.css";

const token = localStorage.getItem("token");
const USERID = localStorage.getItem("user_id");
const favoritesId = localStorage.getItem("favorites_id");

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
  }

  handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("username", userData.username);
  };

  handleAddReview = () => {
    this.setState({
      redirect: "/reviews",
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <Route
          path="/signup"
          component={(props) => (
            <SignUp {...props} handleUser={this.handleUser} />
          )}
        />

        <Route
          path="/login"
          component={(props) => (
            <SignIn {...props} handleUser={this.handleUser} />
          )}
        />
        <Route
          path="/home"
          component={(props) => (
            <HomeContainer {...props} handleAddReview={this.handleAddReview} />
          )}
        />
        <Route exact path="/" component={Cover} />
        <Route exact path="/" component={Globe} />
        <Route exact path="/reviews" component={Reviews} />
      </div>
    );
  }
}

export default App;
