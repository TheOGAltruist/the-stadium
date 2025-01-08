import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., call to an API)
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
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              variant="outlined"
            />
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
