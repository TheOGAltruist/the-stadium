import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useAddCartItemMutation } from "../redux/cart/cartApi";
import {
  addItemToGuestCart,
  updateGuestCartItem,
} from "../redux/cart/cartSlice";

const Home = () => {
  const dispatch = useDispatch(); // to access actions from RTK cartSlice
  // check if user is logged in by accessing authSlice from redux
  const user = useSelector((state) => state.auth.user);
  const guestCart = useSelector((state) => state.cart.guestCart);

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

  // Call addCartItem mutation from RTK
  const [addCartItem] = useAddCartItemMutation();

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
  const handleAddToCart = async (
    productId,
    productName,
    productImage,
    productPrice
  ) => {
    // If logged in, use RTK query to add item to user cart
    if (user) {
      try {
        await addCartItem({ productId, quantity: 1 });
        setSnackbarMessage(`Added to Cart: ${productName}`);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Failed to add to cart", error);
        setSnackbarMessage("Failed to add to cart");
      }
    } else {
      // User is not logged in, add item to guest cart
      // check if item already exists in the cart
      const existingItem = guestCart.find((item) => item.id === productId);
      if (existingItem) {
        // Update quantity if item already exists in guest cart
        dispatch(
          updateGuestCartItem({
            id: productId,
            quantity: existingItem.quantity + 1,
          })
        );
      } else {
        // Add new item to guest cart
        dispatch(
          addItemToGuestCart({
            id: productId,
            name: productName,
            image: productImage,
            price: productPrice,
            quantity: 1,
          })
        );
        // console.log("Guest Cart after adding item:", guestCart);
      }
      setSnackbarMessage(`Added to Guest Cart: ${productName}`);
      setSnackbarOpen(true);
    }
  };
  // Tyler's code
  // const handleAddToCart = (productName) => {
  //   setSnackbarMessage(`Added to Cart: ${productName}`);
  //   setSnackbarOpen(true);
  // };

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

  // using isAuthenticated to check for loggedin status for Wishlist button in product modal
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // show messages for wishlist button click
  const [wishlistMessage, setWishlistMessage] = useState("");

  return (
    <Box className="main-box">
      <Box
        sx={{
          backgroundColor: "#3b3b3b", // Background color
          color: "#edebeb", // Text color (white for contrast)
          width: "100vw", // Full viewport width
          marginTop: "-24px",
          marginLeft: "-8px", // Remove default body margin for consistency
          marginRight: "-8px", // Remove default body margin for consistency
          position: "relative", // Ensure no shift for child elements
        }}
      >
        <Typography
          sx={{ pt: "10px", marginLeft: "1rem" }}
          variant="h4"
          gutterBottom
        >
          Welcome to The Stadium
        </Typography>
        {/* Search Bar */}
        <TextField
          label="Search Products"
          variant="outlined"
          sx={{
            marginBottom: "20px",
            pt: "10px",
            marginLeft: "1rem",
            width: "75%",
            "& .MuiOutlinedInput-root": {
              color: "#edebeb", // Text color
              "& fieldset": {
                borderColor: "#edebeb", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#edebeb", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#edebeb", // Focused border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#edebeb", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#edebeb", // Focused label color
            },
          }}
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
            pt: "10px",
            marginLeft: "1rem",
            pb: "20px",
            "& .MuiOutlinedInput-root": {
              color: "#edebeb", // Text color
              "& fieldset": {
                borderColor: "#edebeb", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#edebeb", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#edebeb", // Focused border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#edebeb", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#edebeb", // Focused label color
            },
          }}
        >
          {/* Filter: Tag */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Tag</InputLabel>
            <Select
              name="tag"
              value={filters.tag}
              onChange={handleFilterChange}
              label="Tag"
            >
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              label="Category"
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort By">
              <MenuItem value="low">Price: Low to High</MenuItem>
              <MenuItem value="high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* Product Grid */}
      <Box sx={{ paddingX: 3 }}>
        {" "}
        {/* Add horizontal padding */}
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
                      onClick={() =>
                        handleAddToCart(
                          product.id,
                          product.name,
                          product.image,
                          product.price
                        )
                      } //added product.id, name, and image
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ backgroundColor: "#8D0801", color: "#edebeb" }}>
            {selectedProduct.name}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#edebeb" }}>
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
                color="primary"
                onClick={() => {
                  if (isAuthenticated) {
                    setWishlistMessage(
                      `Added to Wishlist: ${selectedProduct.name}`
                    );
                  } else {
                    setWishlistMessage(
                      "Please log in to add items to your wishlist."
                    );
                  }
                }}
              >
                Add to Wishlist
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  handleAddToCart(selectedProduct.id, selectedProduct.name)
                } //added selectedProduct.id
              >
                Add to Cart
              </Button>
            </Box>
            {wishlistMessage && (
              <Box
                sx={{
                  marginTop: "20px",
                  padding: "10px",
                  backgroundColor: isAuthenticated ? "#d4edda" : "#f8d7da",
                  color: isAuthenticated ? "#155724" : "#721c24",
                  border: "1px solid",
                  borderColor: isAuthenticated ? "#c3e6cb" : "#f5c6cb",
                  borderRadius: "4px",
                }}
              >
                {wishlistMessage}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#3b3b3b" }}>
            <Button
              onClick={handleClose}
              sx={{
                color: "#edebeb",
              }}
            >
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
