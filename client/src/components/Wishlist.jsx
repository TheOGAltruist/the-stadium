import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
  List,
  ListItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([
    {
      id: 1,
      name: "My First Wishlist",
      editMode: false,
      items: [
        {
          id: 1,
          name: "Soccer Ball",
          price: "$37.67",
          image: "https://via.placeholder.com/150",
          quantity: 1,
          notes: "",
          notesEditable: false,
        },
        {
          id: 2,
          name: "Tennis Racket",
          price: "$129.99",
          image: "https://via.placeholder.com/150",
          quantity: 1,
          notes: "",
          notesEditable: false,
        },
      ],
    },
    {
      id: 2,
      name: "Shared Wishlist",
      editMode: false,
      items: [
        {
          id: 3,
          name: "Basketball",
          price: "$25.99",
          image: "https://via.placeholder.com/150",
          quantity: 1,
          notes: "",
          notesEditable: false,
        },
      ],
    },
  ]);

  const [currentWishlistId, setCurrentWishlistId] = useState(1);
  const [isNewWishlistDialogOpen, setIsNewWishlistDialogOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");

  // Fetch wishlists from API here

  const handleCreateNewWishlist = () => {
    setIsNewWishlistDialogOpen(true);
  };

  const handleNewWishlistSubmit = () => {
    const newWishlistId = wishlists.length + 1;
    const newWishlist = {
      id: newWishlistId,
      name: newWishlistName || `New Wishlist ${newWishlistId}`,
      editMode: false,
      items: [],
    };
    setWishlists([...wishlists, newWishlist]);
    setCurrentWishlistId(newWishlistId);
    setNewWishlistName("");
    setIsNewWishlistDialogOpen(false);
  };

  const handleNotesEditToggle = (wishlistId, itemId) => {
    setWishlists((prevWishlists) =>
      prevWishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? {
              ...wishlist,
              items: wishlist.items.map((item) =>
                item.id === itemId
                  ? { ...item, notesEditable: !item.notesEditable }
                  : item
              ),
            }
          : wishlist
      )
    );
  };

  const handleNotesChange = (wishlistId, itemId, value) => {
    setWishlists((prevWishlists) =>
      prevWishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? {
              ...wishlist,
              items: wishlist.items.map((item) =>
                item.id === itemId ? { ...item, notes: value } : item
              ),
            }
          : wishlist
      )
    );
  };

  // Function to delete an item
  const handleDeleteWishlistItem = (wishlistId, itemId) => {
    setWishlists((prevWishlists) =>
      prevWishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? {
              ...wishlist,
              items: wishlist.items.filter((item) => item.id !== itemId),
            }
          : wishlist
      )
    );
  };

  const handleAddToCart = (item) => {
    console.log(`Adding ${item.name} to the cart...`);
    // Add logic to add the item to the cart here
  };

  const currentWishlist = wishlists.find(
    (wishlist) => wishlist.id === currentWishlistId
  );

  return (
    <Box
      sx={{ pt: { xs: "15rem", md: "5rem" }, display: "flex", gap: 3, p: 3 }}
    >
      {/*Wishlist sidebar */}
      <Box
        sx={{ width: "15%", borderRight: "1px solid #ccc", padding: "10px" }}
      >
        <Typography variant="h6" gutterBottom>
          Your Wishlists
        </Typography>
        <List>
          {wishlists.map((wishlist) => (
            <ListItem
              key={wishlist.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                marginBottom: "5px",
                border: "1px solid",
                borderColor:
                  wishlist.id === currentWishlistId
                    ? "primary.main"
                    : "transparent",
                backgroundColor:
                  wishlist.id === currentWishlistId
                    ? "primary.main"
                    : "transparent",
                color:
                  wishlist.id === currentWishlistId ? "white" : "text.primary",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor:
                    wishlist.id === currentWishlistId
                      ? "primary.dark"
                      : "action.hover",
                  color:
                    wishlist.id === currentWishlistId
                      ? "white"
                      : "text.primary",
                },
              }}
            >
              {wishlist.editMode ? (
                <TextField
                  value={wishlist.name}
                  onChange={(e) =>
                    setWishlists((prevWishlists) =>
                      prevWishlists.map((wl) =>
                        wl.id === wishlist.id
                          ? { ...wl, name: e.target.value }
                          : wl
                      )
                    )
                  }
                  onBlur={() =>
                    setWishlists((prevWishlists) =>
                      prevWishlists.map((wl) =>
                        wl.id === wishlist.id ? { ...wl, editMode: false } : wl
                      )
                    )
                  }
                  autoFocus
                  variant="outlined"
                  size="small"
                  sx={{ flexGrow: 1, marginRight: "8px" }}
                />
              ) : (
                <Typography
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                  onClick={() => setCurrentWishlistId(wishlist.id)}
                >
                  {wishlist.name}
                </Typography>
              )}
              <IconButton
                onClick={() =>
                  setWishlists((prevWishlists) =>
                    prevWishlists.map((wl) =>
                      wl.id === wishlist.id
                        ? { ...wl, editMode: !wl.editMode }
                        : wl
                    )
                  )
                }
                sx={{
                  color: wishlist.editMode ? "green" : "gray",
                  "&:hover": {
                    color: wishlist.editMode ? "green" : "red",
                  },
                }}
              >
                {wishlist.editMode ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateNewWishlist}
        >
          Create New Wishlist
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={3}>
          {currentWishlist?.items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined">
                <CardMedia
                  component="img"
                  height="150"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    objectFit: "cover",
                    borderBottom: "1px solid #ccc",
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Price: {item.price}
                  </Typography>
                  {/* Quantity Selector */}
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (newQuantity >= 0) {
                          setWishlists((prevWishlists) =>
                            prevWishlists.map((wishlist) =>
                              wishlist.id === currentWishlistId
                                ? {
                                    ...wishlist,
                                    items: wishlist.items
                                      .map((prevItem) =>
                                        prevItem.id === item.id
                                          ? {
                                              ...prevItem,
                                              quantity: newQuantity,
                                            }
                                          : prevItem
                                      )
                                      .filter(
                                        (prevItem) => prevItem.quantity > 0
                                      ), // Automatically remove if quantity is 0
                                  }
                                : wishlist
                            )
                          );
                        }
                      }}
                      inputProps={{
                        min: 0,
                        style: {
                          textAlign: "center",
                        },
                      }}
                      sx={{
                        width: "80px",
                        "& input": {
                          padding: "10px",
                          fontSize: "16px",
                        },
                        "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                          {
                            WebkitAppearance: "auto",
                          },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                    />
                    {/* Delete Button */}
                    <IconButton
                      onClick={() =>
                        handleDeleteWishlistItem(currentWishlistId, item.id)
                      }
                      sx={{
                        color: "red",
                        "&:hover": {
                          color: "darkred",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {/* Notes Section */}
                  <Box sx={{ marginTop: 2 }}>
                    {item.notesEditable ? (
                      <>
                        {/* Editable TextField for notes on wishlist with word wrapping and character limit */}
                        <TextField
                          value={item.notes}
                          onChange={(e) => {
                            if (e.target.value.length <= 150) {
                              handleNotesChange(
                                currentWishlistId,
                                item.id,
                                e.target.value
                              );
                            }
                          }}
                          inputProps={{
                            maxLength: 150, // Notes character limit
                            style: {
                              height: "75px",
                              overflowY: "auto",
                              whiteSpace: "pre-wrap",
                              wordWrap: "break-word",
                            },
                          }}
                          multiline
                          fullWidth
                          sx={{
                            height: "75px",
                            overflow: "hidden",
                          }}
                        />
                        {/* Max character counter */}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ textAlign: "right", marginTop: "5px" }}
                        >
                          {item.notes.length}/150
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            height: "75px",
                            overflowY: "auto",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            border: "1px solid #ccc",
                            padding: "8px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            {item.notes || "No notes added."}
                          </Typography>
                        </Box>
                      </>
                    )}
                    {/* Edit/Save Button for notes*/}
                    <IconButton
                      onClick={() =>
                        handleNotesEditToggle(currentWishlistId, item.id)
                      }
                      sx={{
                        color: item.notesEditable ? "green" : "gray",
                        "&:hover": {
                          color: item.notesEditable ? "green" : "red",
                        },
                      }}
                    >
                      {item.notesEditable ? <CheckIcon /> : <EditIcon />}
                    </IconButton>
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* New Wishlist Dialog */}
      <Dialog
        open={isNewWishlistDialogOpen}
        onClose={() => setIsNewWishlistDialogOpen(false)}
      >
        <DialogTitle>Create New Wishlist</DialogTitle>
        <DialogContent>
          <TextField
            label="Wishlist Name"
            fullWidth
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            placeholder="Enter wishlist name"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsNewWishlistDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleNewWishlistSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Wishlist;
