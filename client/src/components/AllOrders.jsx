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

  // Mock order for development
  useEffect(() => {
    const mockOrders = [
      {
        order_id: "12345",
        created_at: "2025-01-01T00:00:00Z",
        status: "Created",
        user: "John Doe",
        paymentMethod: "Credit Card",
        orderItems: [
          {
            product: {
              name: "Bowling Ball",
              product_id: "BB123",
              price: 97.1,
              image: "https://via.placeholder.com/150",
            },
            quantity: 1,
          },
          {
            product: {
              name: "Fingerless Gloves",
              product_id: "FG456",
              price: 30.09,
              image: "https://via.placeholder.com/150",
            },
            quantity: 1,
          },
        ],
      },
      {
        order_id: "67890",
        created_at: "2025-02-15T00:00:00Z",
        status: "Created",
        user: "Jane Smith",
        paymentMethod: "PayPal",
        orderItems: [
          {
            product: {
              name: "Tennis Racket",
              product_id: "TR789",
              price: 129.99,
              image: "https://via.placeholder.com/150",
            },
            quantity: 1,
          },
          {
            product: {
              name: "Tennis Balls (3-pack)",
              product_id: "TB101",
              price: 15.49,
              image: "https://via.placeholder.com/150",
            },
            quantity: 1,
          },
        ],
      },
      {
        order_id: "54321",
        created_at: "2025-03-10T00:00:00Z",
        status: "Created",
        user: "Bob Johnson",
        paymentMethod: "Debit Card",
        orderItems: [
          {
            product: {
              name: "Soccer Ball",
              product_id: "SB234",
              price: 37.99,
              image: "https://via.placeholder.com/150",
            },
            quantity: 2,
          },
          {
            product: {
              name: "Shin Guards",
              product_id: "SG567",
              price: 41.99,
              image: "https://via.placeholder.com/150",
            },
            quantity: 1,
          },
        ],
      },
    ];

    const transformedOrders = mockOrders.map((order) => ({
      orderNumber: order.order_id,
      datePlaced: new Date(order.created_at).toLocaleDateString(),
      totalPrice: `$${order.orderItems
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2)}`,
      status: order.status,
      user: order.user,
      paymentMethod: order.paymentMethod,
      items: order.orderItems.map((item) => ({
        name: item.product.name,
        productId: item.product.product_id,
        price: `$${(item.product.price * item.quantity).toFixed(2)}`,
        quantity: item.quantity,
        image: item.product.image || "https://via.placeholder.com/150",
      })),
    }));

    setOrders(transformedOrders);
    setLoading(false);
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

  // Handle status updates
  const handleStatusUpdate = (orderNumber, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderNumber === orderNumber
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  // Get status styles
  const getStatusStyles = (status) => {
    switch (status) {
      case "Created":
        return { backgroundColor: "indigo", color: "white" };
      case "Processing":
        return { backgroundColor: "darkgoldenrod", color: "white" };
      case "Completed":
        return { backgroundColor: "green", color: "white" };
      case "Cancelled":
        return { backgroundColor: "firebrick", color: "white" };
      default:
        return {};
    }
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

                  {/* User Info */}
                  <Typography variant="body1">
                    <strong>User:</strong> {order.user}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </Typography>

                  {/* Order Status */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...getStatusStyles(order.status),
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginTop: 1,
                    }}
                  >
                    <strong>Status:</strong> {order.status}
                  </Typography>

                  {/* Status Update Buttons */}
                  <Box sx={{ marginTop: "10px" }}>
                    {order.status === "Created" && (
                      <Button
                        variant="contained"
                        sx={{
                          marginRight: "10px",
                          backgroundColor: "darkgoldenrod",
                        }}
                        onClick={() =>
                          handleStatusUpdate(order.orderNumber, "Processing")
                        }
                      >
                        Mark as Processing
                      </Button>
                    )}
                    {order.status === "Processing" && (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            marginRight: "10px",
                            backgroundColor: "green",
                          }}
                          onClick={() =>
                            handleStatusUpdate(order.orderNumber, "Completed")
                          }
                        >
                          Mark as Completed
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginRight: "10px",
                            backgroundColor: "firebrick",
                          }}
                          onClick={() =>
                            handleStatusUpdate(order.orderNumber, "Cancelled")
                          }
                        >
                          Cancel Order
                        </Button>
                      </>
                    )}
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
              <Typography variant="body1">
                <strong>User:</strong> {selectedOrder.user}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  ...getStatusStyles(selectedOrder.status),
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                <strong>Status:</strong> {selectedOrder.status}
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
                      secondary={
                        <>
                          <div>Price: {item.price}</div>
                          <div>Product ID: {item.productId}</div>
                          <div>Quantity: {item.quantity}</div>
                        </>
                      }
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
