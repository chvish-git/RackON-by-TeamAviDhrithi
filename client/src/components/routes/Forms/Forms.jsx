import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const steps = ["Company Details", "Business Type", "Inventory", "Review & Submit"];

export default function RegistrationWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 // const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(""); 
  const navigate = useNavigate();
  


  const handleNext = () => {
    if (activeStep === 0 && !companyName) return alert("Company name is required");
    if (activeStep === 2 && inventory.length === 0) return alert("At least one inventory item is required");
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const addInventoryItem = () => {
    const trimmedItem = newItem.trim();
    if (!trimmedItem) return;

    if (inventory.some(item => item.toLowerCase() === trimmedItem.toLowerCase())) {
      setDuplicateDialogOpen(true);
      return;
    }

    setInventory([...inventory, trimmedItem]);
    setNewItem("");
  };

  const deleteItem = (index) => {
    
      const itemName = inventory[index];  // Get the item name
      setItemToDeleteName(itemName);      // Store it for the dialog
      setDeleteDialogOpen(true);          // Open the dialog
    
    
  };
  
  const handleSubmit = async () => {
    // try {
    //   const userData = { companyName, businessType, inventory };
      
    //   await axios.post("http://localhost:5000/api/register", userData, {
    //     withCredentials: true, // Ensures user session is maintained
    //   });
  
    //   navigate("/profile"); // Redirect to profile page
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    //   alert("Failed to submit data. Please try again.");
    // }
    
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
          title: "Test Submission",
          body: "This is a mock request.",
          userId: 1,
        });
    
        console.log("Success:", response.data);
    
        // Redirect to the dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    
    
  };

 

// const ProfilePage = () => {
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     // Save data logic here...
//     navigate("/dashboard"); // Redirect after submission
//   };

//   return <button onClick={handleSubmit}>Submit</button>;
// };



  const handleEditItem = () => {
    const updatedInventory = [...inventory];
    updatedInventory[editIndex] = editValue;
    setInventory(updatedInventory);
    setEditDialogOpen(false);
    setEditIndex(null);
    setEditValue("");
  };
  
  return (
    <div className="registration-container" style={{ padding: "20px",  background:"##b2beb5"}}>
      <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: "20px" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {activeStep === 0 && (
        <TextField 
          label="Company Name" 
          fullWidth 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          variant="outlined"
          sx={{ backgroundColor: "#b2beb5", color: "#e5e4e2", input: { color: "#000" } }}
        />
      )}

      {activeStep === 1 && (
        <TextField
          select
          label="Business Type"
          fullWidth
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor: "#b2beb5", color: "#e5e4e2", input: { color: "#fff" } }}
        >
          <MenuItem value="Retail">Retail</MenuItem>
          <MenuItem value="Wholesale">Wholesale</MenuItem>
          <MenuItem value="Manufacturing">Manufacturing</MenuItem>
        </TextField>
      )}

      {activeStep === 2 && (
        <div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <TextField 
              label="Inventory Item" 
              fullWidth 
              variant="outlined"
              value={newItem} 
              onChange={(e) => setNewItem(e.target.value)} 
              sx={{ backgroundColor: "#b2beb5", color: "#fff", input: { color: "#000" } }}
            />
            <Button onClick={addInventoryItem} variant="contained">Add Item</Button>
          </div>

          <TableContainer component={Paper} sx={{ backgroundColor: "#121212", maxHeight: "300px", overflowY: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>#</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Item Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "#ddd" }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: "#ddd" }}>{item}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => {
                      setEditIndex(index);
                      setEditValue(item);
                      setEditDialogOpen(true);
                      }}>
                    <EditIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
  <DialogTitle>Edit Item</DialogTitle>
  <DialogContent>
    <TextField
      label="Item Name"
      fullWidth
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      variant="outlined"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleEditItem} color="primary">Save</Button>
    <Button onClick={() => setEditDialogOpen(false)} color="secondary">Cancel</Button>
  </DialogActions>
</Dialog>


<IconButton onClick={() => deleteItem(index)}>
  <DeleteIcon sx={{ color: "#ff4d4d" }} />
</IconButton>


<Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContent>
    Are you sure you want to delete the item: <strong>{itemToDeleteName}</strong>?
  </DialogContent>
  <DialogActions>
    <Button onClick={() => {
      setInventory(inventory.filter((_, i) => i !== index));  // Delete item based on index
      setDeleteDialogOpen(false);  // Close dialog
    }} color="primary">Yes</Button>
    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">No</Button>
  </DialogActions>
</Dialog>



                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Dialog open={duplicateDialogOpen} onClose={() => setDuplicateDialogOpen(false)}>
        <DialogTitle>Duplicate Item</DialogTitle>
        <DialogContent>This item already exists in the inventory.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDuplicateDialogOpen(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === steps.length - 1}>Next</Button>
      </div>

      {activeStep === 3 && (
        <div>
          <h3>Review & Submit</h3>
          <p><strong>Company Name:</strong> {companyName}</p>
          <p><strong>Business Type:</strong> {businessType}</p>
          <p><strong>Inventory Items:</strong> {inventory.join(", ")}</p>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
}
