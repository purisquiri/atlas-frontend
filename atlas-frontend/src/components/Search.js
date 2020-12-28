import React from 'react';
import SearchBar from "material-ui-search-bar";
import Modal from './Modal'

function Search({handleSearch}) {
    return (
       
            <form onSubmit={(event) => handleSearch(event)}>
        <div className="form-group">
          <label>Search by Country Code:</label>
          <input type="text" name="search" className="form-control" />
          <input type="submit" value="Search" className="btn btn-success" />
        </div>
      </form>
    //  <SearchBar onSubmit={(event) => handleSearch(event)}>
    //  <label>Search by Country Code:</label>
    //      <input type="text" name="search"  />
    //      <input type="submit" value="Search" />
    //   </SearchBar>

   
    );
}

export default Search;
