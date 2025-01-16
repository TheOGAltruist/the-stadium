import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../redux/admin/adminApi";

const AdminAccount = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
    imageFile: null,
    tags: "",
    categories: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Initialize the Product-related mutations
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setProductData((prevState) => ({
      ...prevState,
      imageFile: file,
    }));
  };

  const formatInput = (input) => {
    return input
      .split(",")
      .map(
        (item) =>
          item.trim().charAt(0).toUpperCase() +
          item.trim().slice(1).toLowerCase()
      )
      .join(", ");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productData.name) newErrors.name = "Product name is required!";
    if (!productData.description)
      newErrors.description = "Description is required!";
    if (
      !productData.price ||
      isNaN(productData.price) ||
      productData.price <= 0
    ) {
      newErrors.price = "Valid price is required!";
    }
    if (
      !productData.quantity ||
      isNaN(productData.quantity) ||
      productData.quantity < 0
    ) {
      newErrors.quantity = "Valid quantity is required!";
    }
    if (!productData.imageUrl && !productData.imageFile) {
      newErrors.image = "Image URL or file is missing & required!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductSubmit = async () => {
    if (!validateForm()) return;

    // Format tags and categories
    const formattedTags = formatInput(productData.tags);
    const formattedCategories = formatInput(productData.categories);

    // Example payload
    const payload = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      image: productData.imageFile
        ? "uploaded_file_placeholder"
        : productData.imageUrl,
      tags: formattedTags.split(", "),
      categories: formattedCategories.split(", "),
    };

  // API Calls to the backend
    try {
      if (productData.id) {
        // Update product if ID exists
        await updateProduct(payload).unwrap();
        setSuccessMessage("Product successfully updated!");
      } else {
          // Call the createProduct mutation (to backend)
      await createProduct(payload).unwrap();
      //Display the success message and reset form
      setSuccessMessage("Product successfully added");
    }
      setProductData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: "",
        imageFile: null,
        tags: "",
        categories: "",
      });
    } catch (error) {
      console.error("Failed to add product", error);
    }

    // Clears success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setProductData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      imageUrl: "",
      imageFile: null,
      tags: "",
      categories: "",
    });
    setSuccessMessage("");
  };

  return (
    <Box sx={{ pt: { xs: "15rem", md: "5rem" } }} align="center">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage products, view orders, and handle user accounts.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mr: 2 }}
        onClick={() => setShowProductForm(!showProductForm)}
      >
        {showProductForm ? "Hide Form" : "Add Product"}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mr: 2 }}
        onClick={() => navigate("/allorders")}
      >
        View Orders
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/allusers")}
      >
        View Users
      </Button>

      {showProductForm && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "600px",
            position: "relative",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add a New Product
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                required
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                type="number"
                fullWidth
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                type="number"
                fullWidth
                variant="outlined"
                required
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="imageUrl"
                value={productData.imageUrl}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter image URL or upload a file"
                error={!!errors.image}
                helperText={errors.image}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </Button>
              {productData.imageFile && (
                <Typography
                  sx={{ mt: 1 }}
                  variant="body2"
                  color="textSecondary"
                >
                  {productData.imageFile.name} selected
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tags (comma-separated)"
                name="tags"
                value={productData.tags}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="e.g., sports, outdoor, basketball"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Categories (comma-separated)"
                name="categories"
                value={productData.categories}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="e.g., Equipment, Basketball"
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleProductSubmit}
              >
                Submit Product
              </Button>
            </Grid>
          </Grid>
          <IconButton
            onClick={handleCloseForm}
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default AdminAccount;
