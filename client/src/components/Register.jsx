import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Add API call logic here
    console.log("Registration submitted");
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "20px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* Break up into first and last name */}
            <TextField
              label="First Name"
              type="text"
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Last Name"
              type="text"
              required
              fullWidth
              variant="outlined"
            />
            {/* Add username field */}
            <TextField
              label="Username"
              type="email"
              required
              fullWidth
              variant="outlined"
            />
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
              Register
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
