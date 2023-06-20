import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser =JSON.parse(localStorage.getItem("user"));
  const storedToken =localStorage.getItem("token");
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(storedToken? storedToken:null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch("https://node-movie-api-mattg.herokuapp.com/movies",{
      headers: {Authorization:`Bearer ${token}`},
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

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or sign up below
        <SignupView />
      </>
    );
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};
