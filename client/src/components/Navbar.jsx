import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Navbar = ({ user }) => {
  // debugging isAdmin panel to show
  console.log("User Object", user);

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <AppBar
        position="fixed"
        sx={{
          marginBottom: "20px",
          left: 0,
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Title */}
          <Typography
            position="static"
            variant="h4"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            The Stadium
          </Typography>

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
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              startIcon={<InfoIcon />}
            >
              About
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/checkout"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/account"
              startIcon={<AccountCircleIcon />}
            >
              Account
            </Button>
            {user?.isAdmin && (
              <Button
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
