import React from 'react';

function Search({handleSearch}) {
    return (
       
            <form onSubmit={(event) => handleSearch(event)}>
        <div className="form-group">
          <label>Search by Country Code:</label>
          <input type="text" name="search" className="form-control" />
          <input type="submit" value="Search" className="btn btn-success" />
        </div>
      </form>

   
    );
}

export default Search;
