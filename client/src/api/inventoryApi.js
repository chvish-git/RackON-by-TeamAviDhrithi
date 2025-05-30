import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory";

export const addItem = async (userId, item) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/add`, item);
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const getInventory = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const addInventory = async (userId, itemData) => {
    await fetch(`${API_URL}/${userId}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });
  };

export const updateItem = async (userId, itemId, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}/update/${itemId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (userId, itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}/delete/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
