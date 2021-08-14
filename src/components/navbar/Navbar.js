import React, { useContext, useState } from "react";
import "./navbar.scss";
import { NavLink, Link, useHistory } from "react-router-dom";
import searchImage from "../../images/search.svg";
import { SearchContext } from "../../context/SearchContext";

const Navbar = () => {
  const { search, setSearch, setQuery } = useContext(SearchContext);
  let history = useHistory();
  const handleSearchSubmit = (e) => {
    setQuery(search);
    setSearch("");
    history.push("/search");
    e.preventDefault();
  };

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Movies App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/top-rated"
                  activeClassName="active-page"
                >
                  Top Rated
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/popular"
                  activeClassName="active-page"
                >
                  Trending
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/now-playing"
                  activeClassName="active-page"
                >
                  In Theaters
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/upcoming"
                  activeClassName="active-page"
                >
                  Upcoming
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                <img src={searchImage} alt="" />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
