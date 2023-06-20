import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        
        <img className="w-100"src={movie.Imageurl} />
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
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};
