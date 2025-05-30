import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg"; // Ensure the logo path is correct


const Profile = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({ itemName: "", quantity: "", category: "" });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const inventoryRef = collection(db, "users", user.uid, "inventory");

    // Listen for profile changes
    const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCompanyName(userData.companyName || "");
        setBusinessType(userData.businessType || "");
      }
    });

    // Listen for inventory changes
    const unsubscribeInventory = onSnapshot(inventoryRef, (snapshot) => {
      const updatedInventory = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(updatedInventory);
      setLoading(false);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeInventory();
    };
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { companyName, businessType });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddItem = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!newItem.itemName || !newItem.quantity || !newItem.category) {
      alert("Please fill all inventory fields.");
      return;
    }

    try {
      const inventoryRef = collection(db, "users", user.uid, "inventory");
      await addDoc(inventoryRef, newItem);
      setNewItem({ itemName: "", quantity: "", category: "" });
    } catch (error) {
      console.error("Error adding inventory item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "inventory", id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
    
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: "#00FFAA", mb: 3 ,mt:5}}>
      <img 
    src={logo} 
    alt="Rackon Logo" 
    style={{ width: "50px", height: "50px", cursor: "pointer",marginRight:8 }} 
    onClick={() => navigate("/dashboard")} 
  />Profile Analysis
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#00FFAA", color: "#1E1E1E", mb: 2 }}
        onClick={isEditing ? handleSaveClick : handleEditClick}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>

      {/* Loading Indicator */}
      {loading ? <CircularProgress sx={{ display: "block", margin: "20px auto" }} /> : (
        <>
          {/* Company Name */}
          <TextField
            fullWidth
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            InputProps={{ readOnly: !isEditing }}
            sx={{ mb: 2 }}
          />

          {/* Business Type */}
          <Select
            fullWidth
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            disabled={!isEditing}
            sx={{ mb: 2 }}
          >
            <MenuItem value="retail">Retail</MenuItem>
            <MenuItem value="wholesale">Wholesale</MenuItem>
            <MenuItem value="manufacturing">Manufacturing</MenuItem>
          </Select>

          {/* Inventory Items Table */}
          <Typography variant="h5" sx={{ color: "#00FFAA", mt: 3 }}>
            Inventory Items
          </Typography>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#00FFAA" }}>Item Name</TableCell>
                <TableCell sx={{ color: "#00FFAA" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#00FFAA" }}>Category</TableCell>
                <TableCell sx={{ color: "#00FFAA" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteItem(item.id)} sx={{ color: "#FF0000" }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add New Inventory Item */}
          <Typography variant="h6" sx={{ mt: 3, color: "#00FFAA" }}>Add Item</Typography>
          <TextField
            fullWidth
            label="Item Name"
            value={newItem.itemName}
            onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00FFAA", color: "#1E1E1E", mt: 2 }}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </>
      )}
    </Container>
    </Box>
  );
};

export default Profile;
