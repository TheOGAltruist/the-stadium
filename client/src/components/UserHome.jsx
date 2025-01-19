import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const UserHome = () => {
  // Mock user data for testing
  const user = {
    firstname: "John",
    lastname: "Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    address_street1: "123 Main Street",
    address_street2: "Apt 4B",
    address_city: "Springfield",
    address_state: "IL",
    address_country: "USA",
    address_zipcode: 62701,
    savedPayment: "Visa ending in 1234",
  };

  const [editField, setEditField] = useState(null); // Keeps track of which field is being edited
  const [editedAddress, setEditedAddress] = useState({
    street1: user.address_street1,
    street2: user.address_street2,
    city: user.address_city,
    state: user.address_state,
    country: user.address_country,
    zipcode: user.address_zipcode,
  });

  const handleEdit = (field) => {
    setEditField(field); // Set the field to be edited
  };

  const handleSave = (field) => {
    console.log("Saving:", field, "with data:", editedAddress); // Replace this with database update logic
    setEditField(null); // Close the edit mode
  };

  const handleCancelAddressUpdate = () => {
    setEditField(null); // Close the edit mode
  };

  const handleAddressChange = (field, value) => {
    setEditedAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box className="main-box" align="center" px={20}>
      <Typography variant="h4" gutterBottom>
        Hello, {user.firstname} {user.lastname}!
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
          <Typography id="accountdetails" variant="h5" gutterBottom>
            Account Details
          </Typography>

          <Grid container spacing={1} id="account-detail-biographics">
            {/* Non-editable Field: Username */}
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              className="account-detail-row"
            >
              <Grid item xs={11} className="account-detail-text">
                <Typography className="bio-label" variant="body1">
                  <strong>Username:</strong> {user.username}
                </Typography>
              </Grid>
            </Grid>

            {/* Editable Fields */}
            {[
              {
                label: "First Name",
                value: user.firstname,
                field: "firstname",
              },
              { label: "Last Name", value: user.lastname, field: "lastname" },
              { label: "Email", value: user.email, field: "email" },
              {
                label: "Saved Payment",
                value: user.savedPayment,
                field: "savedPayment",
              },
            ].map((item) => (
              <Grid
                container
                item
                xs={12}
                justifyContent="space-between"
                alignItems="center"
                key={item.field}
                className="account-detail-row"
              >
                <Grid item xs={10} className="account-detail-text">
                  <Typography className="bio-label" variant="body1">
                    <strong>{item.label}:</strong> {item.value || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs="auto" className="account-detail-icon">
                  <IconButton
                    onClick={() => handleEdit(item.field)}
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
            ))}

            {/* Address (Single Editable Field) */}
            <Grid
              container
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              className="account-detail-row"
            >
              <Grid item xs={10} className="account-detail-text">
                <Typography className="bio-label" variant="body1">
                  <strong>Address:</strong>{" "}
                  {`${user.address_street1}, ${user.address_street2 || ""}, ${
                    user.address_city
                  }, ${user.address_state}, ${user.address_country} ${
                    user.address_zipcode
                  }`}
                </Typography>
              </Grid>
              <Grid item xs="auto" className="account-detail-icon">
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
            </Grid>

            {/* Expanded Address Form */}
            <Collapse in={editField === "address"} sx={{ width: "100%" }}>
              <Box sx={{ marginTop: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Street Address 1"
                      value={editedAddress.street1}
                      onChange={(e) =>
                        handleAddressChange("street1", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Street Address 2"
                      value={editedAddress.street2}
                      onChange={(e) =>
                        handleAddressChange("street2", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="City"
                      value={editedAddress.city}
                      onChange={(e) =>
                        handleAddressChange("city", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="State"
                      value={editedAddress.state}
                      onChange={(e) =>
                        handleAddressChange("state", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={editedAddress.country}
                      onChange={(e) =>
                        handleAddressChange("country", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      value={editedAddress.zipcode}
                      onChange={(e) =>
                        handleAddressChange("zipcode", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave("address")}
                  >
                    Save Address
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CloseIcon />}
                    onClick={() => handleCancelAddressUpdate("address")}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserHome;
