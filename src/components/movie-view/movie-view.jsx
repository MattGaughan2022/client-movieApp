import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./movie-view.scss";

export const MovieView = ({ user, token, movies, onLoggedIn }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movie.id));

  useEffect(() => {
      setIsFavorite(user.FavoriteMovies.includes(movie.id));
  }, [movieId])
  
  const addFavorite = () => {
    fetch(
      `https://node-movie-api-mattg.herokuapp.com/users/${user.Username}/list/${movie.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    ).then(response=> response.json())
    .then(data => {
      console.log(data);
      if (data.success){
        alert("Added to favorites!");
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data.success));
        onLoggedIn(data.success);
      }
      else{
        alert("Update failed...");
        return false;
      }
    })

  };

  const removeFavorite = () => {
    fetch(
      `https://node-movie-api-mattg.herokuapp.com/users/${user.Username}/list/${movie.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
      ).then(response=> response.json())
      .then(data => {
        if (data.success){
          alert("Removed from favorites!");
          setIsFavorite(false);
          localStorage.setItem("user", JSON.stringify(data.success));
          onLoggedIn(data.success);
          
        }
        else{
          alert("Update failed...");
          return false;
        }
      })
  
    };

  return (
    <div>
      <div>
        <img className="w-100" src={movie.Imageurl} />
      </div>
      <div>
        <span>ID: </span>
        <span>{movie.id}</span>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        {/* modified above line*/}
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.ReleaseYear}</span>
      </div>
      <div>
        <span>Rating: </span>
        <span>{movie.Ratings}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        {/* modified above line */}
      </div>
      <Link to={`/`}>
        <button className="button" style={{ cursor: "pointer" }}>
          Back
        </button>
      </Link>
      <span> </span>
      {isFavorite ? 
        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
        : 
        <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
        } 
        
    </div>
  );
};
