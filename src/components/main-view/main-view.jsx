import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";
import {Row, Col} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./main-view.scss"

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [genres, setGenres] = useState([]);
  const [genreOptions, setGenreOptions] = useState([])
  const [filter, setFilter] = useState("No Filter");
  const [filteredMovies, setFilteredMovies] = useState([])

  //dropdown handling
  const handleFilter = (opt) => {
    let filtered = movies.filter(movie=> movie.Genre.Name.includes(opt.value));
    setFilter(opt.value);
    setFilteredMovies(filtered);
  }
  
  useEffect(() => {
    if (!token) return;
    var d = ["No Filter"];

    //genres obj array fetch
    fetch("https://node-movie-api-mattg.herokuapp.com/genres", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.json())
    .then((data) => {
      const genresFromApi = data.map((doc) => {
        d.push(doc.Name)
        return {
          id: doc._id,
          Name: doc.Name,
          Description: doc.Description,
        };
      });
      setGenres(genresFromApi);
      setGenreOptions(d);
    });

    //fetch movie list
    fetch("https://node-movie-api-mattg.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes> 
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) 
                :(
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView user={user} token={token} movies={movies} 
                    onLoggedIn={(data) => {
                      setUser(data);
                    }}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : filteredMovies.length===0 && filter && filter !=="No Filter" ? (
                  <>
                    <>No movies found for genre: {filter}</>
                    <Row></Row>
                    <Dropdown className="mb-3 w-25" options={genreOptions}  onChange={opt => handleFilter(opt)} value={""} placeholder="Select a Different Genre" />
                  </>
                )
                : filteredMovies.length > 0 ? (
                  <>
                  Filter Movies by Genre: 
                  <Row></Row>
                  <Dropdown className="mb-3 w-25" options={genreOptions}  onChange={opt => handleFilter(opt)} value={""} placeholder="Select a Genre" />
                  <Col className="w-100"md={3}></Col>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard user={user} token={token} movie={movie}/>
                      </Col>
                    ))}
                    </>
                )  
                : filter==="No Filter" ? (
                  <>
                    Filter Movies by Genre: 
                    <Row></Row>
                    <Dropdown className="mb-3 w-25" options={genreOptions}  onChange={opt => handleFilter(opt)} value={""} placeholder="Select a Genre" />
                    <Col className="w-100"md={3}></Col>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard user={user} token={token} movie={movie}/>
                      </Col>
                    ))}
                    
                  </>
                ):(false)}
              </>
            }
          />
          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView user={user} token={token} movies={movies} 
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/update"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ):(
                  <Col md={5}>
                    <UpdateView
                      user={user}
                      token={token}
                      onUpdated={(user) => {
                        setUser(user)
                      }} 
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
