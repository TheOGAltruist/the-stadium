import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useRegisterUserMutation } from "../redux/auth/authApi";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submission handler
  const handleRegister = async (e) => {
    e.preventDefault();
    //Dispatch registerStart action from authSlice
    dispatch(registerStart());
    console.log(formData);

    // Add API call logic here
    try {
      const result = await registerUser(formData).unwrap();
      
      //Dispatch registerSuccess action from authSlice
      dispatch(registerSuccess(result));

      console.log("Registration successful", result);

      // Save the token if returned
      localStorage.setItem("token", result.token);

      // Redirect back to homepage afterwards
      navigate("/");
    } catch (error) {
      dispatch(registerFailure(error)); //Dispatch registerFailure action from authSlice
      console.error("Failed to register:", error);
      }
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
              name="firstName"
              type="text"
              required
              fullWidth
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
            />
            {/* Add username field */}
            <TextField
              label="Username"
              name="username"
              type="text"
              required
              fullWidth
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
            {isError && <Typography color="error">{error.message}</Typography>}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
