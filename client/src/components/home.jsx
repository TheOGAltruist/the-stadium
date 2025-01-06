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
} from "@mui/material";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Basketball",
    price: 29.99,
    color: "Orange",
    sport: "Basketball",
    size: "Medium",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Soccer Ball",
    price: 19.99,
    color: "White",
    sport: "Soccer",
    size: "Small",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 59.99,
    color: "Black",
    sport: "Running",
    size: "Large",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Tennis Racket",
    price: 79.99,
    color: "Blue",
    sport: "Tennis",
    size: "One Size",
    image: "https://via.placeholder.com/150",
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ color: "", sport: "", size: "" });
  const [sortBy, setSortBy] = useState("low"); // Default sort: low to high price
  const [products, setProducts] = useState(mockProducts);

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      filters.color ? product.color === filters.color : true
    )
    .filter((product) =>
      filters.sport ? product.sport === filters.sport : true
    )
    .filter((product) => (filters.size ? product.size === filters.size : true))
    .sort((a, b) => (sortBy === "low" ? a.price - b.price : b.price - a.price));

  return (
    <Box sx={{ pt: { xs: "15rem", md: "0rem" } }}>
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
        {/* Filter: Color */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Color</InputLabel>
          <Select
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Orange">Orange</MenuItem>
            <MenuItem value="White">White</MenuItem>
            <MenuItem value="Black">Black</MenuItem>
            <MenuItem value="Blue">Blue</MenuItem>
          </Select>
        </FormControl>

        {/* Filter: Sport */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sport</InputLabel>
          <Select
            name="sport"
            value={filters.sport}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Basketball">Basketball</MenuItem>
            <MenuItem value="Soccer">Soccer</MenuItem>
            <MenuItem value="Running">Running</MenuItem>
            <MenuItem value="Tennis">Tennis</MenuItem>
          </Select>
        </FormControl>

        {/* Filter: Size */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Size</InputLabel>
          <Select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
            <MenuItem value="One Size">One Size</MenuItem>
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
        {filteredProducts.map((product) => (
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
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
