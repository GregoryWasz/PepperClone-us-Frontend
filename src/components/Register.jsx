import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "../service/axios";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    margin: "0.5rem",
    justifyContent: "center",
    display: "flex",
  },
  textField: { margin: "0.4rem" },
  button: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    margin: "0.4rem",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },
  alert: { margin: "0.5rem" },
});

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const [isError, setIsError] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    if (username && password && email) {
      const registerDTO = { username, password, email };
      console.log(username + " " + password + " " + email);
      console.log(registerDTO);

      await axios
        .post("/users/register", registerDTO)
        .then((response) => {
          console.log(response);
          history.push("/login");
        })
        .catch(() => {});

      setUsername("");
      setPassword("");
      setPassword("");
    } else {
      setIsError(true);
    }
  }

  return (
    <>
      {isError && (
        <Alert className={classes.alert} severity="error">
          Bad Credentials
        </Alert>
      )}
      <Paper className={classes.root}>
        <form>
          <Typography align="center" variant="h4">
            You don't have account?
          </Typography>
          <TextField
            className={classes.textField}
            size="small"
            id="username"
            type="text"
            label="Username"
            variant="outlined"
            fullWidth={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.textField}
            size="small"
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.textField}
            size="small"
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth={true}
            onClick={handleRegister}
            className={classes.button}
          >
            Register for free!
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth={true}
            className={classes.button}
            component={Link}
            to={"/login"}
          >
            I already have account
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default Register;
