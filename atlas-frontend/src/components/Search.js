import React, { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import SimpleModal from "./Modal";
const token = localStorage.getItem("token");

const USERID = localStorage.getItem("user_id");

function Search({ handleAddReview, handleSearch, removeCountry }) {
  const [modal, changeModal] = useState(false);
  const [event, newEvent] = useState("");
  const [country, newCountry] = useState([]);
  const [countryId, newId] = useState("");

  // useEffect(() => {
  //   if (event !== "") {
  //     fetch("http://localhost:3000/api/v1/countries", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         country_code: event,
  //       }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => console.log(data.country_code));

  //   }

  // });

  const handleModal = (event) => {
    let countryIds = []
    event.preventDefault();
    changeModal(true);
    newEvent(event.target.add.value.toUpperCase());
    document.getElementsByTagName("form")[0].reset();
    fetch("http://localhost:3000/api/v1/countries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then(
        (data) =>
          (data.filter((newestCountry) => {
            newCountry((country) => [...country, newestCountry])
          }))
      
      );
  };

  const filterCountryID = (event) => {
    country.filter((country) =>
      country.country_code === event ? newId(country.id) : null
    );
  };

  const deleteCountries = (event) => {
    let countryIds = ""
    country.filter((country) =>
      country.country_code === event ? countryIds = country.id : null
    )
    fetch(`http://localhost:3000/api/v1/favorites/${USERID}/${countryIds}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    removeCountry(event);
    
  };

  return (
    <div>
      {modal ? (
        <SimpleModal
          handleAddReview={handleAddReview}
          changeModal={changeModal}
          handleSearch={handleSearch}
          event={event}
          open={modal}
          deleteCountries={deleteCountries}
          countryId={countryId}
          countries={country}

        />
      ) : null}
      <form onSubmit={(e) => handleModal(e)}>
        <div className="form-group">
          <label>Add or Delete Country</label>
          <input
            type="text"
            name="add"
            placeholder="Alpha-3 code"
            className="form-control"
          />
          <input type="submit" value="add" className="btn btn-success" />
        </div>
      </form>
    </div>

    //  <SearchBar onSubmit={(event) => handleSearch(event)}>
    //  <label>Search by Country Code:</label>
    //      <input type="text" name="search"  />
    //      <input type="submit" value="Search" />
    //   </SearchBar>
  );
}

export default Search;
