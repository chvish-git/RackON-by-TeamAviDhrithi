import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {auth,db } from "../firebase";
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
 // ✅ Ensure firebase is initialized

const Signup = ({ setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  // const auth = getAuth(app);
  // const db = getFirestore(app);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setOpenSnackbar(true);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        companyName:businessName,
        inventory: [],
      });

      setUserId(user.uid); // ✅ Set user ID globally
      navigate("/profile"); // ✅ Redirect after signup
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in.");
        navigate("/login");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address!");
        setOpenSnackbar(true);
      } else {
        setError(error.message);
        setOpenSnackbar(true);
      }
  }
  };

  return (
    <Container maxWidth="sm">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{
          p: 4,
          bgcolor: "#1E1E2F",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 255, 255, 0.3)",
          color: "#E0F7FA",
          textAlign: "center"
        }}>
          <Typography variant="h4" gutterBottom>Sign Up</Typography>
          <form onSubmit={handleSignup}>
            <TextField fullWidth margin="normal" label="Business Name" variant="outlined" value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} required sx={{ input: { color: "#E0F7FA" }, label: { color: "#80DEEA" } }} />
            <TextField fullWidth margin="normal" label="Email" type="email" variant="outlined" value={email} 
              onChange={(e) => setEmail(e.target.value)} required sx={{ input: { color: "#E0F7FA" }, label: { color: "#80DEEA" } }} />
            <TextField fullWidth margin="normal" label="Password" type="password" variant="outlined" value={password} 
              onChange={(e) => setPassword(e.target.value)} required sx={{ input: { color: "#E0F7FA" }, label: { color: "#80DEEA" } }} />
            <TextField fullWidth margin="normal" label="Re-enter Password" type="password" variant="outlined" value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} required sx={{ input: { color: "#E0F7FA" }, label: { color: "#80DEEA" } }} />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#00BFA5", '&:hover': { bgcolor: "#00897B" } }}>Sign Up</Button>
            </motion.div>
          </form>
        </Box>
      </motion.div>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
