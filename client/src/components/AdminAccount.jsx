import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminAccount = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: { xs: "15rem", md: "5rem" } }} align="center">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage products, view orders, and handle user accounts.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mr: 2 }}
        onClick={() => navigate("/product-management")}
      >
        Manage Products
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mr: 2 }}
        onClick={() => navigate("/allorders")}
      >
        View Orders
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/allusers")}
      >
        View Users
      </Button>
    </Box>
  );
};

export default AdminAccount;
