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
import {
  useChangeOrderStatusMutation,
  useGetAllOrdersQuery,
} from "../redux/admin/adminApi";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const navigate = useNavigate();
  // console.log(orders);

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

  // Handle status updates (USE ChangeOrderStatus Mutation)
  const handleStatusUpdate = async (orderNumber, newStatus) => {
    try {
      await changeOrderStatus({
        orderId: orderNumber,
        status: newStatus,
      }).unwrap();
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status");
      alert("Failed to update order status");
    }
  };
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.orderNumber === orderNumber
  //         ? { ...order, status: newStatus }
  //         : order
  //     )
  //   );
  // };

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
    <Box className="main-box" align="center" px={20}>
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mr: 2 }}
        onClick={() => navigate("/admin")}
      >
        Back to Dashboard
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading orders.
        </Typography>
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
                    {/* Andrew - had to change orderNumber to order_id, etc. to match our data structure */}
                    {/* Order Info */}
                    <Typography variant="h6">
                      <strong>Order #:</strong> {order.order_id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Date Placed:</strong>{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </Typography>
                    {/* <Typography variant="body1">
                      <strong>Total Price:</strong> {order.totalPrice}
                    </Typography> */}
                  </Box>

                  {/* User Info */}
                  <Typography variant="body1">
                    <strong>User:</strong> {order.user?.firstname}{" "}
                    {order.user?.lastname}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Payment Method:</strong> {order.payment?.name}
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
                          handleStatusUpdate(order.order_id, "Processing")
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
                            handleStatusUpdate(order.order_id, "Completed")
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
                            handleStatusUpdate(order.order_id, "Cancelled")
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
                    {order.orderItems?.map((item, idx) => (
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
                        image={item.product?.image}
                        alt={item.product?.name}
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
                <strong>Order #:</strong> {selectedOrder.order_id}
              </Typography>
              <Typography variant="body1">
                <strong>Date Placed:</strong>{" "}
                {new Date(selectedOrder.created_at).toLocaleDateString()}
              </Typography>
              {/* <Typography variant="body1">
                <strong>Total Price:</strong> {selectedOrder.totalPrice}
              </Typography> */}
              <Typography variant="body1">
                <strong>User:</strong> {selectedOrder.user?.firstname}{" "}
                {selectedOrder.user?.lastname}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Method:</strong> {selectedOrder.payment?.name}
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
                {selectedOrder.orderItems?.map((item, index) => (
                  <ListItem key={index} sx={{ alignItems: "flex-start" }}>
                    <CardMedia
                      component="img"
                      image={item.product?.image}
                      alt={item.product?.name}
                      sx={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "4px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                    <ListItemText
                      primary={item.product?.name}
                      secondary={
                        <>
                          <div>Price: {item.product?.price}</div>
                          <div>Product ID: {item.product_id}</div>
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
