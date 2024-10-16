import React from "react";
import icon from "../static/img/nav/search.svg";
import "../static/css/Search.css";

const Search = () => {
  return (
    <div className="search">
      <div className="search-parent">
        <div className="search-input-wrapper">
          <input type="text" placeholder="Search" />
          <img src={icon} alt="search icon" className="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default Search;
