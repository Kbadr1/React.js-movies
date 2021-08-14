import React, { useState } from "react";
import "./movie.scss";
import { Link } from "react-router-dom";
import starImage from "../../images/star.svg";

const Movie = ({ movie }) => {
  const [hover, setHover] = useState(null);
  let onHover = (id) => {
    setHover(id);
  };

  let onOut = () => {
    setHover(null);
  };

  return (
    <div
      className="Movie"
      key={movie.id}
      onMouseOver={() => onHover(movie.id)}
      onMouseOut={onOut}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          className={hover === movie.id ? `poster filter` : `poster`}
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
        />
        <div className={hover === movie.id ? `details ` : `details hidden`}>
          <img className="star" src={starImage} alt="" />
          <p className="rating">{movie.vote_average} / 10</p>
          <button type="button" className="btn btn-primary">
            View Details
          </button>
        </div>
        <p className="movie-title">{movie.title}</p>
        <p className="movie-year">{movie.release_date}</p>
      </Link>
    </div>
  );
};

export default Movie;
