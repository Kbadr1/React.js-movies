import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./movieDetails.scss";
import youtube from "../../images/youtube.svg";

import starImage from "../../images/star.svg";

const MovieDetails = (props) => {
  const [hover, setHover] = useState(null);
  let onHover = (id) => {
    setHover(id);
  };

  let onOut = () => {
    setHover(null);
  };

  const [details, setDetails] = useState({
    poster: "",
    title: "",
    releaseDate: "",
    overview: "",
    genres: [],
    rating: "",
    runtime: "",
    language: [],
  });

  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);

  let movieId = props.match.params.id;

  const getMovieDetails = () => {
    axios
      .get(
        `
    https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        console.log(res.data);
        setDetails({
          poster: res.data.poster_path,
          title: res.data.title,
          releaseDate: res.data.release_date,
          overview: res.data.overview,
          genres: res.data.genres,
          rating: res.data.vote_average,
          runtime: res.data.runtime,
          language: res.data.spoken_languages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSimilarMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        console.log("similar", res.data.results);
        setSimilarMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  const getMovieVideos = () => {
    axios
      .get(
        `
    https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setMovieVideos(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieDetails();
    getSimilarMovies();
    getMovieVideos();
  }, [props.match.params.id]);

  return (
    <div className="MovieDetails container pt-5">
      <div className="row">
        <div className="col-12 col-sm-4 col-lg-3 pb-5 poster">
          <img src={`https://image.tmdb.org/t/p/w1280${details.poster}`} />
        </div>
        <div className="col-12 col-sm-8 col-lg-6 pb-5">
          <h1>{details.title}</h1>
          <br />
          <h5 className="year">{details.releaseDate.slice(0, 4)}</h5>

          <p>
            {details.genres.map((genre, index) => (
              <span className="genres" key={genre.id}>
                {(index ? " / " : "") + genre.name}
              </span>
            ))}
          </p>
          <p style={{ fontWeight: 500 }}>
            Language:{" "}
            {details.language.map((language, index) => (
              <span key={language.id} key={language.name}>
                {(index ? " - " : "") + language.name}
              </span>
            ))}
          </p>
          <p style={{ fontWeight: 500 }}>Rating: {details.rating}</p>
          <p style={{ fontWeight: 500 }}>Duration: {details.runtime} minutes</p>

          <p className="overview">{details.overview}</p>
          {movieVideos.slice(0, 1).map((video) => (
            <button
              type="button"
              className="btn btn-primary trailer-button"
              key={video.id}
            >
              <a
                className="trailer-link"
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
              >
                <img
                  src={youtube}
                  style={{ width: "25px", marginRight: "10px" }}
                  alt=""
                />
                Watch the trailer
              </a>
            </button>
          ))}
        </div>
        <div className="col-12 col-lg-3 pb-5 similar ">
          <h5>Similar Movies</h5>
          <div className="row">
            {similarMovies.slice(0, 4).map((movie) => (
              <div
                className="col-6 col-sm-3 col-lg-6 p-2"
                key={movie.id}
                onMouseOver={() => onHover(movie.id)}
                onMouseOut={onOut}
              >
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className={hover === movie.id ? ` filter` : ``}
                    src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                    style={{ width: "100%" }}
                    alt=""
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
