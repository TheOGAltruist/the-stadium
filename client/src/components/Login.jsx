import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Login = () => {
  // Tracks email or username
  const [loginInput, setLoginInput] = useState("");
  // Tracks password
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

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
    console.log("Login submitted");
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
