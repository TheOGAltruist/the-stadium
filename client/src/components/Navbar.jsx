import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector to access Redux state
import Logo from "../assets/Stadium.png"; // Import the logo
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
  // Initialize useHistory for navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the authentication state from Redux
  const user = useSelector((state) => state.auth.user);
  // debugging isAdmin panel to show
  // console.log("User Object", user);

  // Logout function
  const handleLogout = async () => {
    try {
      // Make a RTK backend call to logout and clear session cookies/tokens
      dispatch(logout());
      // Redirect back to homepage
      navigate("/");
      // Show an alert message
      alert("Successfully logged out!");
    } catch (error) {
      console.error("faied to logout", error);
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <AppBar
        position="fixed"
        sx={{
          marginBottom: "20px",
          left: 0,
          top: 0,
          backgroundColor: "#8D0801",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1, // Space between logo and text
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src={Logo}
              alt="The Stadium Logo"
              sx={{
                height: "100px",
                width: "100px",
                objectFit: "contain",
                backgroundColor: "#708D81",
                padding: "6px",
                paddingX: "20px",
                marginLeft: "-25px",
              }}
            />
            {/* Title */}
            <Typography
              position="static"
              variant="h1"
              sx={{ textAlign: "left" }}
              color="#edebeb"
            >
              The Stadium
            </Typography>
          </Box>

          <br />

          {/* Navigation Links with Icons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1, // Adds spacing between buttons
            }}
          >
            <Button
              className="navButton"
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button
              className="navButton"
              color="inherit"
              component={Link}
              to="/about"
              startIcon={<InfoIcon />}
            >
              About
            </Button>
            <Button
              className="navButton"
              color="inherit"
              component={Link}
              to="/checkout"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
            {user ? (
              <>
                <Button
                  className="navButton"
                  color="inherit"
                  component={Link}
                  to="/userhome"
                  startIcon={<AccountCircleIcon />}
                >
                  Account
                </Button>
                <Button
                  className="navButton"
                  color="inherit"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className="navButton"
                color="inherit"
                component={Link}
                to="/account"
                startIcon={<AccountCircleIcon />}
              >
                Login/Register
              </Button>
            )}
            {user?.isAdmin && (
              <Button
                className="navButton"
                color="inherit"
                component={Link}
                to="/admin"
                startIcon={<AdminPanelSettingsIcon />}
              >
                Admin
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
