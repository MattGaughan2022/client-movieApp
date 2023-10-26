import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const UpdateView = ({
  user,
  token,
  onLoggedOut,
  onLoggedIn,
  onUpdated,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newPassword2, setPassword2] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  let OldUsername = user.Username;
  let OldPassword = oldPassword;
  let CheckPassword = newPassword2;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword2 !== newPassword) {
      alert("New password fields do not match");
    } else {
      const data = {
        Username: username,
        Password: newPassword,
        OldPassword: OldPassword,
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
        .then((response) => response.json())
        .then((data) => {
          if (data.Username) {
            localStorage.setItem("user", JSON.stringify(data));
            console.log("Update response: ", data);
            alert(
              "Updated successfully: " + data.Username + ". Redirecting..."
            );
            onUpdated(data);
            navigate("/");
          } else {
            alert("Update failed...");
            console.log("Error when updating: ", data);
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
          style={{ backgroundColor: "white" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Current Password:</Form.Label>
        <Form.Control
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          style={{ backgroundColor: "white" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Re-Enter New Password:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword2}
          onChange={(e) => setPassword2(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
      </Form.Group>
      <Button type="submit"> Save Changes</Button>
    </Form>
  );
};
