import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {Link} from 'react-router-dom'
import Typography from "@mui/material/Typography";

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00c8ff"

      }}
    >
      <Box
        borderRadius={theme.shape.borderRadius}
        sx={{
          width: theme.breakpoints.values.sm,
          bgcolor: "#FFFFFF",
          padding: " 3rem 2rem",
        }}
      >
        <Box textAlign="center" marginBottom="1rem">
          <img src="/logo.png" alt="Logo" />
        </Box>
        {isLoginForm ? (
          <Typography variant="h5">Login to your account</Typography>
        ) : (
          <Typography variant="h5">Create a new account</Typography>
        )}
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        {isLoginForm ? (
          <Box textAlign="center" margin=".5rem 0">
            Don't have an account?{" "}
            <Link to='/register'>Create one</Link>
          </Box>
        ) : (
          <Box textAlign="center" margin=".5rem 0">
            Already registered?{" "}
            <Link to='/login'>Sign in</Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
