import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import Movie from "../../components/movie/Movie";

const Search = () => {
  const { query } = useContext(SearchContext);

  const [searchMoviesResults, setSearchMoviesResults] = useState([]);

  const getSearchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
      )
      .then((res) => {
        setSearchMoviesResults(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSearchMovies();
  }, [query]);

  return (
    <div className="Search container pt-5 pb-5">
      <div className="row">
        {searchMoviesResults.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <Movie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
