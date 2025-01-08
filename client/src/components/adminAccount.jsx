import { Box, Typography, Button } from "@mui/material";

const AdminAccount = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage products, view orders, and handle user accounts.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mr: 2 }}>
        Add Product
      </Button>
      <Button variant="outlined" color="secondary">
        View Orders
      </Button>
    </Box>
  );
};

export default AdminAccount;
