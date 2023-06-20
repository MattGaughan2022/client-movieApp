import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss"

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100"
      //style={{ width: "35rem" }}
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img style={{ cursor: "pointer" }} variant="top" src={movie.Imageurl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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
    Genre: PropTypes.string,
    Director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
