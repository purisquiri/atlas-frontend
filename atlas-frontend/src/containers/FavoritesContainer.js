import React, { useEffect } from "react";
import instance from '../BaseUrl'

const token = localStorage.getItem("token");
const USERID = localStorage.getItem("user_id");


const FavoritesContainer = ({ countryId, changeFavorites }) => {
  //   componentDidMount() {
  //     fetch(`http://localhost:3000/api/v1/users/${USERID}`, {
  //       headers: { Authorization: `Bearer ${token}`},
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) =>
  //         data.countries.map((country) => (
  //             this.props.changeCountries([...this.props.countries, country.country_code])))
  //       );
  //   }

  useEffect(() => {
    fetch(`${instance()}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: USERID,
        country_id: countryId,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => localStorage.setItem("favorites_id", data.id));
  });

  return <div></div>;
};

export default FavoritesContainer;
