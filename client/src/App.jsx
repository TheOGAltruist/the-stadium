import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "./Components/home.jsx";
import About from "./components/about.jsx";
import Checkout from "./components/checkoutCart.jsx";
import Navbar from "./components/navbar.jsx";
import Account from "./components/userAccount.jsx";
import Admin from "./components/adminAccount.jsx";

function App() {
  return (
    <BrowserRouter>
      <div id="container">
        <div id="navbar">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
