import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card,Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ user, token, movies, onLoggedOut }) => {
  let favoriteMovies = movies.filter(movie=> user.FavoriteMovies.includes(movie.id));
  const navigate = useNavigate();
  if (!user.Birthday) {
    user.Birthday = "N/A";
  }
  let nullMovies = "";
  if (user.FavoriteMovies < 1){
    nullMovies = "N/A";
  }
  const deleteUser = () =>{
    fetch(
      `https://node-movie-api-mattg.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(user=> {
        if(!user){
          alert("Deletion failed...");
          return false;
        }
        else{
          alert("User is being deleted. Redirecting...");
          onLoggedOut();
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  }
  return (
    <>
    <Col className="mb-4">
      <Card >
        <Card.Body className="body">
        <Card.Text>Username: {user.Username}</Card.Text>
        <Card.Text>Email: {user.Email}</Card.Text>
        <Card.Text>Birthday: {user.Birthday}</Card.Text>
        <div style={{display:"flex"}}>
        <Link as={Link} to={"/update"}>
          <Button>Edit Profile</Button>
        </Link>
        <Button style={{marginLeft: "auto"}}variant="danger" onClick={deleteUser} >Delete Profile</Button>
        </div>
        </Card.Body>
      </Card>
    </Col>
    <Col md={10}>
      <h2>{user.Username} Favorite Movies: {nullMovies}</h2>
    </Col>
    <Row>
      {favoriteMovies.map(movie=>(
        <Col className="mb-4" md={4} key={movie.id}>
          <MovieCard movie={movie}/>
        </Col>
      ))}
      </Row>
    </>
  );
};
