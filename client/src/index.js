const express = require("express");
const cors = require("cors");

const app = express();
//const inventoryRoutes = require("./routes/inventoryRoutes");
app.use(cors());
app.use(express.json()); // ✅ Ensure JSON parsing is enabled

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// ✅ Register inventory routes
const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
