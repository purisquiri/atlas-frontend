import React, { Component } from "react";

const token = localStorage.getItem("token");
const USERID = localStorage.getItem("user_id")

export default class FavoritesContainer extends Component {
  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${USERID}`, {
      headers: { Authorization: `Bearer ${token}`},
    })
      .then((resp) => resp.json())
      .then((data) =>
        data.countries.map((country) => (
            this.props.changeCountries([...this.props.countries, country.country_code])))
      );
  }

  render() {
    return <div></div>;
  }
}
