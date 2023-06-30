import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export const ProfileView = ({ user }) => {
  if (!user.Birthday) {
    user.Birthday = "N/A";
  }
  return (
    <Card>
      <Card.Text>Username: {user.Username}</Card.Text>
      <Card.Text>Email: {user.Email}</Card.Text>
      <Card.Text>Birthday: {user.Birthday}</Card.Text>
      <Link as={Link} to={"/update"}>
        <Button>Edit Profile</Button>
      </Link>
    </Card>
  );
};
