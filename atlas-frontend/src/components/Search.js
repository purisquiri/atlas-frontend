import React, { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import SimpleModal from "./Modal";

function Search({ handleSearch }) {
  const [modal, changeModal] = useState(false);
  const [event, newEvent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (event !== "") {
      fetch("http://localhost:3000/api/v1/countries", {
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
        .then((data) => console.log(data.country_code));
       
    }
    
  });

  const handleModal = (event) => {
    event.preventDefault();
    changeModal(true);
    newEvent(event.target.search.value);
    document.getElementsByTagName("form")[0].reset();
  };

  return (
    <div>
      {modal ? (
        <SimpleModal
          changeModal={changeModal}
          handleSearch={handleSearch}
          event={event}
          open={modal}
        />
      ) : null}
      <form onSubmit={(e) => handleModal(e)}>
        <div className="form-group">
          <label>Search by Country Code:</label>
          <input type="text" name="search" className="form-control" />
          <input type="submit" value="Search" className="btn btn-success" />
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
