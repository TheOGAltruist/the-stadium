import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useLoginUserMutation } from "../redux/api/apiSlice";
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  // Tracks email or username
  const [loginInput, setLoginInput] = useState("");
  // Tracks password
  const [password, setPassword] = useState("");
  // integrating RTK Query for calling api/auth/login
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Regex to check if input is an email, if false it is treated as a username
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);

    // Log or send login data for API handling
    const loginData = {
      loginType: isEmail ? "email" : "username",
      loginValue: loginInput,
      password,
    };

    // console log for testing regex statement
    console.log("Login Data:", loginData);

    // Add API call logic here
    try {
      const user = await loginUser(loginData).unwrap();
      // Handle successful login
      if (user.user && user.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.token);

        console.log("Login successful", user);

        // Dispatch loginSuccess action to store token and user data in Redux
        dispatch(loginSuccess({ user: user.user, token: user.token }));

        // Redirect back to homepage
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure(error.message || "Failed to login"));
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "20px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* Email or Username Input */}
            <TextField
              label="Email or Username"
              type="text"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />

            {/* Password Input */}
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {isError && (
              <Typography color="error" variant="body2" textAlign="center">
                {error?.data?.message ||
                  "Invalid credentials, please try again."}
              </Typography>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
