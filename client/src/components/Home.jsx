import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "../redux/products/productsApi";

// Mock product data
// const mockProducts = [
//   {
//     id: "1",
//     name: "Basketball",
//     description:
//       "A high-quality basketball suitable for indoor and outdoor play.",
//     price: 29.99,
//     quantity: 50,
//     skuId: "BB123",
//     image: "https://via.placeholder.com/150",
//     tags: ["sports", "indoor", "outdoor"],
//     categories: ["Equipment", "Basketball"],
//   },
//   {
//     id: "2",
//     name: "Soccer Ball",
//     description: "Durable soccer ball designed for all weather conditions.",
//     price: 19.99,
//     quantity: 100,
//     skuId: "SB456",
//     image: "https://via.placeholder.com/150",
//     tags: ["sports", "outdoor"],
//     categories: ["Equipment", "Soccer"],
//   },
//   {
//     id: "3",
//     name: "Running Shoes",
//     description: "Comfortable running shoes with excellent grip and support.",
//     price: 59.99,
//     quantity: 30,
//     skuId: "RS789",
//     image: "https://via.placeholder.com/150",
//     tags: ["footwear", "running"],
//     categories: ["Shoes", "Running"],
//   },
//   {
//     id: "4",
//     name: "Tennis Racket",
//     description: "Lightweight tennis racket for players of all skill levels.",
//     price: 79.99,
//     quantity: 20,
//     skuId: "TR101",
//     image: "https://via.placeholder.com/150",
//     tags: ["sports", "tennis"],
//     categories: ["Equipment", "Tennis"],
//   },
// ];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ tag: "", category: "" });
  const [sortBy, setSortBy] = useState("low"); // Default sort: low to high price
  // const [products, setProducts] = useState(mockProducts);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // RTK query fetch all products
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();

  // RTK Query fetch product details
  const { data: selectedProduct } = useGetProductByIdQuery(selectedProductId, {
    // skip the whole query if no product is selected
    skip: !selectedProductId,
  });

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Open product details modal
  const handleViewDetails = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  // Show snackbar
  const handleAddToCart = (productName) => {
    setSnackbarMessage(`Added to Cart: ${productName}`);
    setSnackbarOpen(true);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      filters.tag ? product.tags.includes(filters.tag) : true
    )
    .filter((product) =>
      filters.category ? product.categories.includes(filters.category) : true
    )
    .sort((a, b) => (sortBy === "low" ? a.price - b.price : b.price - a.price));

  return (
    <Box sx={{ pt: { xs: "15rem", md: "5rem" } }}>
      <Typography variant="h4" gutterBottom>
        Welcome to The Stadium
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px" }}
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Filters and Sort */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {/* Filter: Tag */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Tag</InputLabel>
          <Select name="tag" value={filters.tag} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="indoor">Indoor</MenuItem>
            <MenuItem value="outdoor">Outdoor</MenuItem>
            <MenuItem value="footwear">Footwear</MenuItem>
            <MenuItem value="running">Running</MenuItem>
            <MenuItem value="tennis">Tennis</MenuItem>
          </Select>
        </FormControl>

        {/* Filter: Category */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Equipment">Equipment</MenuItem>
            <MenuItem value="Basketball">Basketball</MenuItem>
            <MenuItem value="Soccer">Soccer</MenuItem>
            <MenuItem value="Shoes">Shoes</MenuItem>
            <MenuItem value="Running">Running</MenuItem>
            <MenuItem value="Tennis">Tennis</MenuItem>
          </Select>
        </FormControl>

        {/* Sort By Price */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="low">Price: Low to High</MenuItem>
            <MenuItem value="high">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error loading products</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    ${Number(product.price).toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>In Stock:</strong> {product.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedProduct.name}</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              height="200"
              image={selectedProduct.image}
              alt={selectedProduct.name}
              sx={{ marginBottom: "20px" }}
            />
            <DialogContentText>{selectedProduct.description}</DialogContentText>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              <strong>Price:</strong> $
              {Number(selectedProduct.price).toFixed(2)}
            </Typography>
            <Typography variant="body2">
              <strong>SKU:</strong> {selectedProduct.skuId}
            </Typography>
            <Typography variant="body2">
              <strong>In Stock:</strong> {selectedProduct.quantity}
            </Typography>
            <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  alert(`Added to Wishlist: ${selectedProduct.name}`)
                }
              >
                Add to Wishlist
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(selectedProduct.name)}
              >
                Add to Cart
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for Add to Cart */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default Home;
