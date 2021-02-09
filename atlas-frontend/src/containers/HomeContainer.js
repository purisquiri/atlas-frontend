import React, { Component } from "react";
import MapboxGLMap from "../components/MapBoxGLMap";
import Search from "../components/Search";
import Navbar from "./Navbar";
import FavoritesContainer from "./FavoritesContainer";
import instance from '../BaseUrl'

const token = localStorage.getItem("token");
const USERID = localStorage.getItem("user_id");
const favoritesId = localStorage.getItem("favorites_id");


class HomeContainer extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      countries: [],
      modalOpen: false,
      countryId: "",
    };
  }

  componentDidMount() {
    if (token) {
      fetch(`${instance()}/users/${USERID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.countries.map((country) =>
            this.setState({
              countries: [...this.state.countries, country.country_code],
            })
          );
        });
    }
  }

  handleSearch = (event) => {
    fetch(`${instance()}/countries`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.filter((country) => {
          if (
            country.country_code === event &&
            !this.state.countries.includes(country.country_code)
          ) {
            this.setState({
              countries: [...this.state.countries, country.country_code],
              countryId: country.id,
            });
            //Add this if below doesn't work
          } else if (this.state.countries.includes(undefined)) {
            window.location.reload();
          }
        });
        let newCodes = data.map((country) => {
          return country.country_code;
        });
        if (!newCodes.includes(event)) {
          this.addCountry(event);
        }
      });
  };

  addCountry = (event) => {
    fetch(`${instance()}/countries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country_code: event,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          countries: [...this.state.countries, data.country_code],
          countryId: data.id,
        });
      });
  };

  removeCountry = (event) => {
    let newCountry = this.state.countries.filter(
      (country) => country !== event
    );
    this.setState({
      countries: newCountry,
    });
    console.log(newCountry);
  };

  setModal = (openOrClose) => this.setState({ modalOpen: openOrClose });

  render() {
    return (
      <div>
        <div>
          {token
            ? [
                <Navbar key={1} />,
                <Search
                  handleAddReview={this.props.handleAddReview}
                  key={2}
                  handleSearch={this.handleSearch}
                  setModal={this.setModal}
                  removeCountry={this.removeCountry}
                />,
              ]
            : null}
        </div>
        <MapboxGLMap key={3} countries={this.state.countries} />
        {this.state.countryId !== "" ? (
          <FavoritesContainer key={4} countryId={this.state.countryId} />
        ) : null}
      </div>
    );
  }
}

export default HomeContainer;
