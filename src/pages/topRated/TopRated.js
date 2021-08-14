import React, { useEffect, useState } from "react";
import "./topRated.scss";
import axios from "axios";
import Movie from "../../components/movie/Movie";

const Discover = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const getTopRatedMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        setTopRatedMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return (
    <div className="upcoming container pt-5 pb-5">
      <div className="row">
        {topRatedMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <Movie movie={movie} />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Discover;
