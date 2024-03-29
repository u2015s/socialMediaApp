import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { registerUser } from "../redux/authSlice";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/home");
    }
  }, [isLoggedIn, history]);
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        name="name"
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter full name"
        type="text"
        required
      />
      <TextField
        name="handle"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Choose an handle"
        type="text"
        required
      />
      <TextField
        name="email"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Email"
        type="email"
        required
      />
      <TextField
        name="password"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Password"
        type="password"
        required
      />
      <Button
        type="submit"
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
          backgroundColor: "#00c8ff"

        }}
        variant="contained"
        // color="primary"
      >
        {status === "loading" ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
