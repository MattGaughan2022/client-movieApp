import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(storedToken ? storedToken : null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch("https://node-movie-api-mattg.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            Title: doc.Title,
            Imageurl: doc.Imageurl,
            ReleaseYear: doc.ReleaseYear,
            Description: doc.Description,
            Ratings: doc.Ratings,
            Genre: doc.Genre,
            Director: doc.Director,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);



  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or sign up below
          <SignupView />
          </Col>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black"}}>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        </Col>
      ) : movies.length === 0 ? (
        <div> The list is empty!</div>
      ) : (
        <>
        <p></p>
        <Button  onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        <p></p>
          {movies.map((movie) => (
            <Col key={movie.id} md={3} className="mb-3">
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};