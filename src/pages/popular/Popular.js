import React, { useEffect, useState } from "react";
import "./popular.scss";
import axios from "axios";
import Movie from "../../components/movie/Movie";

const Discover = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  const getPopularMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        setPopularMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="Popular container pt-5 pb-5">
      <div className="row">
        {popularMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <Movie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
