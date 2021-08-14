import React, { useEffect, useState } from "react";
import axios from "axios";
import "./discover.scss";
import Movie from "../../components/movie/Movie";

const Discover = () => {
  const [discoverMovies, setDiscoverMovies] = useState([]);

  const getDiscoverMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        console.log(res.data);
        setDiscoverMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDiscoverMovies();
  }, []);

  return (
    <div className="discover container pt-5 pb-5">
      <div className="row">
        {discoverMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <Movie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
