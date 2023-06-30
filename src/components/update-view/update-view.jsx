import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateView = ({ user, token, onLoggedOut, onLoggedIn }) => {
  const [username, setUsername] = useState(user.Username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newPassword2, setPassword2] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword2 !== newPassword) {
      alert("New password fields do not match");
    } else {
      const data = {
        OldUsername: user.Username,
        Username: username,
        OldPassword: oldPassword,
        Password: newPassword,
        CheckPassword: newPassword2,
        Email: email,
        Birthday: birthday,
      };
      fetch(
        `https://node-movie-api-mattg.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            alert("Update successful");
            // window.location.reload();
            return response.json();
          } else {
            alert("Update failed...");
            return response.json();
          }
        })
        .then((user) => {
          if (user) {
            onLoggedIn();
          }
        });
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     setUsername(user.Username);
  //     setEmail(user.Email);
  //   }
  // });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="3"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Current Password:</Form.Label>
        <Form.Control
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Re-Enter New Password:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Update Profile</Button>
    </Form>
  );
};
