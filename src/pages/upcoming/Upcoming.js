import React, { useEffect, useState } from "react";
import "./upcoming.scss";
import axios from "axios";
import Movie from "../../components/movie/Movie";

const Discover = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const getUpcomingMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        setUpcomingMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return (
    <div className="Upcoming container pt-5 pb-5">
      <div className="row">
        {upcomingMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <Movie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
