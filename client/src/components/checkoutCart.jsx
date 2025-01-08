import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CheckoutCart = () => {
  // Mock cart data
  const [cart, setCart] = useState([
    { id: 1, name: "Basketball", price: 29.99, quantity: 1 },
    { id: 2, name: "Soccer Ball", price: 19.99, quantity: 2 },
    { id: 3, name: "Running Shoes", price: 59.99, quantity: 1 },
  ]);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box
      sx={{
        pt: { xs: "200px", md: "4rem" },
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        <ShoppingCartIcon fontSize="large" /> Checkout Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ marginTop: "20px" }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Box>
          {/* List of Cart Items */}
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <CardContent sx={{ flex: "1" }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">
                  Price: ${item.price.toFixed(2)}
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Quantity Modifier */}
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 1)
                  }
                  sx={{ width: "70px", marginRight: "10px" }}
                  inputProps={{ min: 1 }}
                />

                {/* Remove Button */}
                <IconButton color="error" onClick={() => removeItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}

          {/* Total Price */}
          <Box sx={{ marginTop: "20px", textAlign: "right" }}>
            <Typography variant="h6">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "10px" }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CheckoutCart;
