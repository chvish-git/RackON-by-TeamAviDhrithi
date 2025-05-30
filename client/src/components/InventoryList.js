import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useState(null);
  const [newItem, setNewItem] = useState({ itemName: "", quantity: "", price: "" });
  const [editingItem, setEditingItem] = useState(null); // Track editing item
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchInventory(currentUser.uid);
      } else {
        console.error("User not authenticated!");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchInventory = async (userId) => {
    try {
      const inventoryRef = collection(db, "users", userId, "inventory");
      const querySnapshot = await getDocs(inventoryRef);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInventory(items);
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User not authenticated!");
      return;
    }

    try {
      const inventoryRef = collection(db, "users", user.uid, "inventory");

      if (editingItem) {
        // Update existing item
        const itemDoc = doc(db, "users", user.uid, "inventory", editingItem.id);
        await updateDoc(itemDoc, {
          itemName: newItem.itemName,
          quantity: parseInt(newItem.quantity, 10),
          price: parseFloat(newItem.price),
        });

        setEditingItem(null); // Clear edit mode
      } else {
        // Add new item
        await addDoc(inventoryRef, {
          itemName: newItem.itemName,
          quantity: parseInt(newItem.quantity, 10),
          price: parseFloat(newItem.price),
        });
      }

      setNewItem({ itemName: "", quantity: "", price: "" });
      fetchInventory(user.uid); // Refresh list
    } catch (error) {
      console.error("Error saving item:", error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ itemName: item.itemName, quantity: item.quantity, price: item.price });
  };

  const handleDelete = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "inventory", id));
      fetchInventory(user.uid);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  return (
    <div>
      <h2>Your Inventory</h2>
      
      <form onSubmit={handleAddItem}>
        <input type="text" placeholder="Item Name" value={newItem.itemName} onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })} required />
        <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} required />
        <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
        <button type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
      </form>

      {inventory.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              {item.itemName} - {item.quantity} units - ₹{item.price}
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryList;
