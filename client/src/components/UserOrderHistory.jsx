import React, { useState } from "react";
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
} from "@mui/material";

const UserOrderHistory = () => {
  // Mock orders data
  const orders = [
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
      datePlaced: "December 18, 2024",
      totalPrice: "$137.79",
      items: [
        {
          name: "Soccer Ball",
          price: "$37.67",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Real Madrid Jersey",
          price: "$100.12",
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      orderNumber: "54321",
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
      orderNumber: "67891",
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
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
    <Box className="main-box" align="center" px={20}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

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

      {/* Dialog for Order Details */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ backgroundColor: "#8D0801", color: "#edebeb" }}>
          Order Details
        </DialogTitle>
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

export default UserOrderHistory;
