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
      {/* Andrew- Added some logic to display register or login */}
      <Typography variant="body2" textAlign="center" gutterBottom>
        {showLogin
          ? "Don't have an account? Click Register to sign up!"
          : "Already have an account? Click Login to sign in."}
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
