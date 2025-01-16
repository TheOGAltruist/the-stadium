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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate Register Form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    //Dispatch registerStart action from authSlice
    dispatch(registerStart());
    console.log(formData);

    // Add API call logic here
    try {
      const result = await registerUser({
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      //Dispatch registerSuccess action from authSlice
      dispatch(registerSuccess(result));

      console.log("Registration successful", result);

      // Save the token if returned
      // localStorage.setItem("token", result.token);

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
              error={!!errors.firstName} //this is how we can show the form validation errors
              helperText={errors.firstName} //here as well
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
              error={!!errors.username} //form validation errors
              helperText={errors.username} //form validation errors
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password} //form validation errors
              helperText={errors.password} //form validation errors
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
