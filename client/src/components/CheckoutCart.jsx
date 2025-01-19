import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  useMyCartItemsQuery,
  useNewOrderMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../redux/user/userApi";

const CheckoutCart = () => {
  // RTK Query Fetch cart items
  const { data = [], isLoading, error, refetch } = useMyCartItemsQuery();
  // console.log(data);
  // try to access the array of cart items from the response object from the backend
  const cart = Array.isArray(data) ? data : []; // check if data is array and set it to cart. if not, set it to empty array
  // console.log(cart);
  Object.keys(data).forEach((key) => {
    cart.push(data[key]);
  });
  // console.log(cart);

  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [newOrder] = useNewOrderMutation();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Refresh the cart data after adding or updating items
  useEffect(() => {
    refetch();
  }, [cart]);

  // Update quantity
  const updateQuantity = async (id, newQuantity) => {
    try {
      // Call the update cart item mutation from RTK
      await updateCartItem({
        cartItemId: id,
        quantity: Math.max(1, newQuantity),
      });
      //Refresh the cart
      refetch();
    } catch (error) {
      console.error("Failed to update cart item", error);
    }
  };
  // Tyler's code
  // const updateQuantity = (id, newQuantity) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
  //     )
  //   );
  // };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      // Call the remove cart item mutation from RTK
      await removeCartItem(id);
      // refresh the cart
      refetch();
    } catch (error) {
      console.error("Failed to remove cart item", error);
    }
  };
  // Tyler's code
  // const removeItem = (id) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  // };

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce(
      (total, item) => total + `${Number(item.product.price)}` * item.quantity,
      0
    ); //Andrew changed item.price to item.product.price and to a number

  // Handle checkout
  const handleCheckout = async () => {
    try {
      // call newOrder from RTK
      await newOrder({ items: cart });
      // Set orderPlaced to true upon successful order
      setOrderPlaced(true);
    } catch (error) {
      console.error("Failed to place order", error);
      alert("Failed to place order");
    }
  };

  // added isLoading to show user when it's loading
  if (isLoading) {
    return <CircularProgress />;
  }

  // added an error message
  if (error) {
    return <Typography variant="h6">Failed to load cart items.</Typography>;
  }

  // if order is successful, added display message
  if (orderPlaced) {
    return (
      <Box sx={{ pt: { xs: "15rem", md: "5rem" }, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Order Successfully Placed!
        </Typography>
        <Typography variant="body1">
          Thank you for your purchase. Your order is being processed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          onClick={() => setOrderPlaced(false)} //reset to view cart and continue shopping
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box className="main-box">
      <Typography variant="h4" textAlign="center" gutterBottom>
        <ShoppingCartIcon fontSize="large" /> Checkout Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ marginTop: "20px" }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Box sx={{ paddingX: 20 }}>
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
                {/* Andrew - added img and name to cart display */}
                <img
                  src={item.product.image} // Assuming item.product.image contains the image URL
                  alt={item.product.name} // Assuming item.product.name contains the product name
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                {/* Display Product Name and Price */}
                {/* Andrew - added product name to display */}
                {/* Andrew - changed item.price to item.product.price and to a number */}
                <Box>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography variant="body2">
                    Price: ${Number(item.product.price).toFixed(2)}
                  </Typography>
                </Box>
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
              onClick={handleCheckout}
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
