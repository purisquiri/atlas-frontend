import React, { Component } from "react";
import MapboxGLMap from "../components/MapBoxGLMap";
import Search from "../components/Search";
import SimpleModal from "../components/Modal";
import Navbar from "./Navbar";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      modalOpen: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/countries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }

  setModal = (openOrClose) => this.setState({ modalOpen: openOrClose });

  handleSearch = (event) => {
    this.setState({
      countries: [...this.state.countries, event],
    });
    // console.log("ttttttt")
  };

  render() {
    return (
      <div>
        <Navbar />
        <Search handleSearch={this.handleSearch} setModal={this.setModal} />
        <MapboxGLMap countries={this.state.countries} />
      </div>
    );
  }
}

export default HomeContainer;
