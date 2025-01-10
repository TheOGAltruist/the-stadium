import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Checkout from "./components/CheckoutCart.jsx";
import Navbar from "./components/Navbar.jsx";
import UserAccount from "./components/UserAccount.jsx";
import AdminAccount from "./components/AdminAccount.jsx";
import UserHome from "./components/UserHome.jsx";

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
          <Route path="/account" element={<UserAccount />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminAccount />} />
          <Route path="/userhome" element={<UserHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
