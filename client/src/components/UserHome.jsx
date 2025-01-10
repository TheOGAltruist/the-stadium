import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserHome = () => {
  // Mock user data for testing
  const user = {
    fullName: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Springfield, USA",
    savedPayment: "Visa ending in 1234",
  };

  const handleEdit = (field) => {
    // Add edit logic here
  };

  return (
    <Box sx={{ pt: { xs: "15rem", md: "5rem" } }} align="center">
      <Typography variant="h4" gutterBottom>
        Hello, {user.fullName}!
      </Typography>

      {/* Order History and Wishlist Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          href="/orderhistory"
        >
          Order History
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ textTransform: "none" }}
          href="/wishlist"
        >
          Wishlist
        </Button>
      </Box>

      {/* Account Details */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Account Details
          </Typography>

          {/* Username (non-editable) */}
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Username:</strong> {user.username}
            </Typography>
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Name:</strong> {user.fullName}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <IconButton
                onClick={() => handleEdit("name")}
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>

            {/* Email */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <IconButton
                onClick={() => handleEdit("email")}
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>

            {/* Phone */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Phone:</strong> {user.phone}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <IconButton
                onClick={() => handleEdit("phone")}
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>

            {/* Address */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Address:</strong> {user.address}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <IconButton
                onClick={() => handleEdit("address")}
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>

            {/* Saved Payment */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Saved Payment:</strong> {user.savedPayment}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <IconButton
                onClick={() => handleEdit("savedPayment")}
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserHome;
