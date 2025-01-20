import React, { useState, useEffect, useRef } from "react";
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
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartMutation,
} from "../redux/cart/cartApi";
import { useNewOrderMutation } from "../redux/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromGuestCart,
  setGuestCartItems,
  updateGuestCartItem,
} from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutCart = () => {
  const isFirstRender = useRef(true);
  const dispatch = useDispatch(); // to access cartSlice from RTK
  const navigate = useNavigate();

  // check if user is logged in by accessing authSlice from redux
  const user = useSelector((state) => state.auth.user);
  // access guestCart from Redux state
  const guestCart = useSelector((state) => state.cart.guestCart);

  // RTK Query Fetch cart items
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useMyCartItemsQuery(undefined, {
    // skip the call if they aren't logged in
    skip: !user,
  });
  // console.log(data);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [newOrder] = useNewOrderMutation();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!user) {
        alert("Please log in/register to view your cart");
        // redirect to login page
        navigate("/account");
        // Initialize guest cart to empty
        dispatch(setGuestCartItems([]));
      }
    }
  }, [user, guestCart, dispatch]); // added dependencies to make sure it only runs once when they change.

  // Initialize cart as empty array
  let cart = [];

  // If the user is logged in, use the data from the backend
  if (user) {
    // Check if the data is an array and set it to cart, otherwise initialize as an empty array
    cart = Array.isArray(data) ? data : [];

    // If data is not an array, attempt to push its values into the cart array
    if (!Array.isArray(data)) {
      Object.keys(data).forEach((key) => {
        cart.push(data[key]);
      });
    }
  } else {
    // If the user is not logged in, use the guest cart from the Redux state
    cart = guestCart;
  }
  // console.log(cart);

  // Refresh the cart data after adding or updating items
  useEffect(() => {
    // console.log("Is Logged In:", user);
    if (user && shouldRefetch) {
      refetch();
      setShouldRefetch(false); //reset the trigger once it refreshes the cart
    }
  }, [user, shouldRefetch, refetch]);

  // Update quantity
  const updateQuantity = async (id, newQuantity) => {
    if (user) {
      try {
        // Call the update cart item mutation from RTK
        await updateCartItem({
          cartItemId: id,
          quantity: Math.max(1, newQuantity),
        });
        //Refresh the cart
        setShouldRefetch(true);
      } catch (error) {
        console.error("Failed to update cart item", error);
      }
    } else {
      // update guest cart items if user not logged in
      dispatch(updateGuestCartItem({ id, quantity: Math.max(1, newQuantity) }));
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
    if (user) {
      try {
        // Call the remove cart item mutation from RTK
        await removeCartItem(id);
        // refresh the cart
        setShouldRefetch(true);
      } catch (error) {
        console.error("Failed to remove cart item", error);
      }
    } else {
      // remove guest cart item if not logged in
      dispatch(removeItemFromGuestCart(id));
    }
  };
  // Tyler's code
  // const removeItem = (id) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  // };

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce((total, item) => {
      const price = user ? item.product?.price : item.price;
      return total + (Number(price) || 0) * item.quantity;
    }, 0); //Andrew changed item.price to item.product.price and to a number

  // Handle checkout
  const handleCheckout = async () => {
    try {
      if (user) {
        // call newOrder from RTK
        // await newOrder({ items: cart });
        // Set orderPlaced to true upon successful order
        setOrderPlaced(true);
        // Clear the user cart after checking out
        await deleteCart();
      }
      // Clear the guest cart in the frontend state
      if (!user) {
        dispatch(clearGuestCart());
      }
    } catch (error) {
      console.error("Failed to place order", error);
      alert("Failed to place order");
    }
  };

  // Clear guest cart after order placement
  useEffect(() => {
    if (orderPlaced && !user) {
      dispatch(clearGuestCart());
    }
  }, [orderPlaced, user, dispatch]);

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
          {cart.map((item) => {
            const image = user ? item.product.image : item.image;
            const name = user ? item.product.name : item.name;
            const price = user ? item.product.price : item.price;

            return (
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
                    src={image} // Assuming item.product.image contains the image URL
                    alt={name} // Assuming item.product.name contains the product name
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  {/* Display Product Name and Price */}
                  {/* Andrew - added product name to display */}
                  {/* Andrew - changed item.price to item.product.price and to a number */}
                  <Box>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2">
                      Price: ${Number(price).toFixed(2)}
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
            );
          })}

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
