import React, { useEffect, useState } from "react";
import "./nowPlaying.scss";
import axios from "axios";
import Movie from "../../components/movie/Movie";

const NowPlaying = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const getNowPlayingMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        setNowPlayingMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return (
    <div className="NowPlaying container pt-5 pb-5">
      <div className="row">
        {nowPlayingMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <Movie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
