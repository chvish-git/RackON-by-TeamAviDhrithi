import React, { useState } from "react";
import { addInventory } from "../api/inventoryApi";

const InventoryForm = ({ userId, onItemAdded }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !quantity || !price) {
      alert("All fields are required!");
      return;
    }

    try {
      await addInventory(userId, { itemName, quantity: Number(quantity), price: Number(price) });
      onItemAdded(); // Refresh inventory list
      setItemName("");
      setQuantity("");
      setPrice("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
