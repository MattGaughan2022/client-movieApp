import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card
      className="h-100 "
      //style={{ width: "35rem" }}
      // onClick={() => {
      //   onMovieClick(movie);
      // }}
    >
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img
          style={{ cursor: "pointer" }}
          variant="top"
          src={movie.Imageurl}
        />
      </Link>
      <Card.Body className="body">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Imageurl: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Ratings: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
};
