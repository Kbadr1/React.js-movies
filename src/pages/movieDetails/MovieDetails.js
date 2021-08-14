import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./movieDetails.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import actorImage from "../../images/actor.svg";
import youtube from "../../images/youtube.svg";

const MovieDetails = (props) => {
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
  const [movieCast, setMovieCast] = useState([]);

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

  const getMovieCast = () => {
    axios
      .get(
        `
    https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setMovieCast(res.data.cast);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieDetails();
    getSimilarMovies();
    getMovieVideos();
    getMovieCast();
  }, [props.match.params.id]);

  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 1000,
    draggable: true,
    slidesToShow: 12,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="MovieDetails container">
      <div className="row">
        <div className="col-12 col-sm-4 col-md-3 poster">
          <img src={`https://image.tmdb.org/t/p/w1280${details.poster}`} />
        </div>
        <div className="col-12 col-sm-8 col-md-6">
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
        <div className="col-12 col-md-3 similar">
          <h5>Similar Movies</h5>
          <div className="row">
            {similarMovies.slice(0, 4).map((movie) => (
              <div className="col-6 col-sm-3 col-md-6" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img
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
      <div className="cast">
        <h2>Cast</h2>
        <Slider {...settings}>
          {movieCast.slice(0, 20).map((actor) => (
            <div className="actor" key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w1280${actor.profile_path}`
                    : `${actorImage}`
                }
                alt=""
              />
              <p>{actor.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieDetails;
