import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ pt: { xs: "15rem", md: "5rem" } }}>
      <Typography variant="h3" gutterBottom textAlign="center" color="primary">
        About The Stadium
      </Typography>

      <Box sx={{ marginBottom: "30px" }} align="center">
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1">
          At <strong>The Stadium</strong>, we are dedicated to equipping
          athletes, fans, and enthusiasts with the finest sports gear, fan
          merchandise, and performance-driven apparel. Whether you're scoring
          the winning goal or supporting your team from the stands,{" "}
          <strong>The Stadium</strong> is here to ensure you’re prepared to
          excel and celebrate.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "30px" }} align="center">
        <Typography variant="h5" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1">
          Founded in 2010, <strong>The Stadium</strong> began as a local
          retailer for sports enthusiasts in our community. Over the years,
          we’ve grown into a global e-commerce platform, trusted by thousands of
          customers for delivering high-quality products and unparalleled
          service. From cutting-edge sports equipment to exclusive fan apparel,{" "}
          <strong>The Stadium</strong> has become the go-to destination for all
          things sports.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "30px" }} align="center">
        <Typography variant="h5" gutterBottom>
          Why Choose The Stadium?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Premium Products
                </Typography>
                <Typography variant="body2">
                  We offer an extensive collection of premium sports equipment,
                  clothing, and accessories from top brands to ensure unmatched
                  quality and performance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Outstanding Support
                </Typography>
                <Typography variant="body2">
                  Our knowledgeable and friendly customer service team is ready
                  to assist you with expert advice and quick solutions for any
                  concerns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fast & Reliable Shipping
                </Typography>
                <Typography variant="body2">
                  We’ve partnered with the best shipping providers to ensure
                  your orders arrive quickly and in perfect condition, so you
                  can gear up without delay.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box align="center">
        <Typography variant="h5" gutterBottom>
          Join the Community at The Stadium
        </Typography>
        <Typography variant="body1">
          Shopping at <strong>The Stadium</strong> means more than just buying
          gear – it’s about being part of a vibrant community of athletes, fans,
          and sports lovers. Let’s push boundaries, celebrate victories, and
          share the love of the game. Gear up with <strong>The Stadium</strong>{" "}
          and take your passion to the next level!
        </Typography>
      </Box>
    </Box>
  );
}
