import React, { Component } from "react";
import HomeContainer from "./containers/HomeContainer";

import SignIn from "./containers/LoginContainer";
import SignUp from "./containers/SignUpContainer";
import { Route } from "react-router-dom";
import Globe from "./components/Globe";
import Cover from "./components/Cover";

import "./App.css";

class App extends Component {
 

  handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("username", userData.username);
  };

  // handleAddReview = () => {
  //   this.setState({
  //     redirect: "/reviews",
  //   });
  // };

  render() {
   
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
          component={HomeContainer}
        />
        <Route exact path="/" component={Cover} />
        <Route exact path="/" component={Globe} />
        {/* <Route exact path="/reviews" component={Reviews} /> */}
      </div>
    );
  }
}

export default App;
