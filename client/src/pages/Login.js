import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const Login = ({ setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        console.error("User data not found!");
        return;
      }
      setUserId(user.uid);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
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
          <Typography variant="h4" gutterBottom>Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField fullWidth margin="normal" label="Email" type="email" variant="outlined" value={email} 
              onChange={(e) => setEmail(e.target.value)} required sx={{ input: { color: "#E0F7FA" }, label: { color: "#80DEEA" } }} />
            <TextField fullWidth margin="normal" label="Password" type="password" variant="outlined" value={password} 
              onChange={(e) => setPassword(e.target.value)} required sx={{ input: { color: "#E0F7FA" }, label: { color: "#80DEEA" } }} />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#00BFA5", '&:hover': { bgcolor: "#00897B" } }}>Login</Button>
            </motion.div>
          </form>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login;
