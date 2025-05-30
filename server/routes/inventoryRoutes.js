const express = require("express");
//const cors = require("cors");
const admin = require("firebase-admin");

const router = express.Router();

// ✅ Initialize Firebase directly in this file
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // ✅ Firestore instance

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid; // ✅ Extract user ID
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// ✅ Secure Routes
router.use(verifyToken);



router.get("/", async (req, res) => {
    try {
        const userId = req.userId;
        console.log("Fetching inventory for user:", userId);

        const inventoryRef = db.collection(userId).doc(userId).collection("inventory");
        const snapshot = await inventoryRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "No inventory items found" });
        }

        let inventory = [];
        snapshot.forEach(doc => {
            inventory.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).send(error.message);
    }
});

// ✅ Route to add an inventory item

router.post("/add", async (req, res) => {
    try {
      console.log("Request body:", req.body); // ✅ Log incoming data
  
      const { itemName, quantity, price } = req.body;
      if (!itemName || !quantity || !price) {
        return res.status(400).send("Missing required fields");
      }
  
      const userId = req.params.userId;
      await db.collection("users").doc(userId).collection("inventory").add({
        itemName,
        quantity,
        price,
        timestamp: new Date(),
      });
  
      res.status(201).send("Item added successfully!");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send(error.message);
    }
  });

  router.patch("/update/:itemId", async (req, res) => {
    try {
      const userId = req.userId; // ✅ Get user ID from verified token
      const { itemId } = req.params;
        const { itemName, quantity, price } = req.body;

        console.log(`Updating item ${itemId} for user ${userId}`);

        const itemRef = db.collection("users").doc(userId).collection("inventory").doc(itemId);
        const itemDoc = await itemRef.get();

        if (!itemDoc.exists) {
            return res.status(404).json({ message: "Item not found" });
        }

        await itemRef.update({
            ...(itemName && { itemName }),
            ...(quantity && { quantity }),
            ...(price && { price }),
            timestamp: new Date(),
        });

        res.status(200).json({ message: "Item updated successfully" });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send(error.message);
    }
});

router.delete("/delete/:itemId", async (req, res) => {
  try {
      const  userId = req.userId;
      const itemId = req.params.itemId;
      console.log(`Deleting item: ${itemId} for user: ${userId}`);

      const itemRef = db.collection("users").doc(userId).collection("inventory").doc(itemId);
      const doc = await itemRef.get();

      if (!doc.exists) {
          return res.status(404).json({ message: "Item not found" });
      }

      await itemRef.delete();
      res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).send(error.message);
  }
});


  

module.exports = router;
