import React from "react";
import { BiSearch } from "react-icons/bi";
import "./styles.css";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img
          src="http://assets.stickpng.com/images/584830f5cef1014c0b5e4aa1.png"
          alt="the news app"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-category-list">
        {["Home", "Lifestyle", "Fashion", "Sports", "Tech", "World"].map(
          (category) => {
            return <span className="navbar-category">{category}</span>;
          }
        )}
      </div>
      <div className="navbar-search-container">
        <BiSearch
          className="search-icon"
          style={{ color: "white", fontSize: "1.5em" }}
          onMouseOver={({ target }) => (target.style.color = "#375c79")}
          onMouseOut={({ target }) => (target.style.color = "#808080")}
        />
      </div>
    </nav>
  );
};

export default Header;
