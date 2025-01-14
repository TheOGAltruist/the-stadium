import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // API fetch logic
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch("/api/orders");
  //       const data = await response.json();
  //       setOrders(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchOrders();
  // }, []);

  // Mock order for development
  useEffect(() => {
    const mockOrders = [
      {
        orderNumber: "12345",
        datePlaced: "January 1, 2025",
        totalPrice: "$127.19",
        items: [
          {
            name: "Bowling Ball",
            price: "$97.10",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Fingerless Gloves",
            price: "$30.09",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      {
        orderNumber: "67890",
        datePlaced: "February 15, 2025",
        totalPrice: "$215.48",
        items: [
          {
            name: "Tennis Racket",
            price: "$129.99",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Tennis Balls (3-pack)",
            price: "$15.49",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Sports Water Bottle",
            price: "$70.00",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      {
        orderNumber: "54321",
        datePlaced: "March 10, 2025",
        totalPrice: "$79.98",
        items: [
          {
            name: "Soccer Ball",
            price: "$37.99",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Shin Guards",
            price: "$41.99",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      {
        orderNumber: "98765",
        datePlaced: "April 5, 2025",
        totalPrice: "$354.00",
        items: [
          {
            name: "Hockey Stick",
            price: "$189.00",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Hockey Helmet",
            price: "$165.00",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      {
        orderNumber: "13579",
        datePlaced: "May 22, 2025",
        totalPrice: "$62.50",
        items: [
          {
            name: "Baseball Glove",
            price: "$40.00",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Baseball Cap",
            price: "$22.50",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      {
        orderNumber: "24680",
        datePlaced: "June 18, 2025",
        totalPrice: "$142.29",
        items: [
          {
            name: "Basketball",
            price: "$45.00",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Basketball Shoes",
            price: "$97.29",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
    ];

    setOrders(mockOrders);
    setLoading(false); // Ensure loading is set to false after mock data is added
  }, []);

  // Open dialog to view order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ pt: { xs: "15rem", md: "5rem" } }} align="center">
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Order Info */}
                    <Typography variant="h6">
                      <strong>Order #:</strong> {order.orderNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Date Placed:</strong> {order.datePlaced}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Price:</strong> {order.totalPrice}
                    </Typography>
                  </Box>

                  {/* Thumbnails for all items in the order */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "10px",
                    }}
                  >
                    {order.items.map((item, idx) => (
                      <CardMedia
                        key={idx}
                        component="img"
                        sx={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "4px",
                          objectFit: "cover",
                          border: "1px solid #ccc",
                        }}
                        image={item.image}
                        alt={item.name}
                      />
                    ))}
                  </Box>

                  {/* View Details Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(order)}
                    sx={{ marginTop: "10px" }}
                  >
                    View Order Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog for Order Details */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="h6" gutterBottom>
                <strong>Order #:</strong> {selectedOrder.orderNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Date Placed:</strong> {selectedOrder.datePlaced}
              </Typography>
              <Typography variant="body1">
                <strong>Total Price:</strong> {selectedOrder.totalPrice}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Items:
              </Typography>
              <List>
                {selectedOrder.items.map((item, index) => (
                  <ListItem key={index} sx={{ alignItems: "flex-start" }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "4px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                    <ListItemText
                      primary={item.name}
                      secondary={`Price: ${item.price}`}
                      align="right"
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AllOrders;
