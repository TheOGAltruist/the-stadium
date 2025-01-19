import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

const UserAccount = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Box className="main-box">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Account
      </Typography>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          variant={"contained"}
          color={showLogin ? "secondary" : "primary"}
          onClick={() => setShowLogin(true)}
          sx={{ marginRight: "10px" }}
        >
          Login
        </Button>
        <Button
          variant={"contained"}
          color={showLogin ? "primary" : "secondary"}
          onClick={() => setShowLogin(false)}
        >
          Register
        </Button>
      </Box>
      {/* Render Login or Register based on user selection */}
      {showLogin ? <Login /> : <Register />}
    </Box>
  );
};

export default UserAccount;
