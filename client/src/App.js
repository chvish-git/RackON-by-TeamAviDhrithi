import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/routes/LandingPage/LandingPage";
import Forms from "./components/routes/Forms/Forms";
import Login from './pages/Login';
import Signup from './pages/Signup';
import InventoryList from "./components/InventoryList";
import InventoryForm from "./components/InventoryForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile"; 
import OverSales from "./pages/Oversales";
import { useState } from "react";
import "@mui/material/styles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0097a7" },
    background: { default: "#121212", paper: "#1e1e1e" },
  },
});

function App() {
  const [userId, setUserId] = useState(null); 
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUserId={setUserId} />} /> {/* ✅ Pass setUserId */}
          <Route path="/signup" element={<Signup setUserId={setUserId} />} /> {/* ✅ Pass setUserId */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/inventory" element={<InventoryList />} /> {/* ✅ Cleaner */}
          <Route path="/oversales" element={<OverSales />} />

          
          <Route path="/profile" element={<Profile />} />
          </Routes>
      </Router>
    </ThemeProvider>

    
  );
}

export default App;
