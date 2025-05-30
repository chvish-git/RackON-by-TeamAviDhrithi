import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure firebase is correctly set up
import { Button, Container, Typography, Box } from "@mui/material";

const OverSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sales"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Sales Overview
      </Typography>

      {/* Timeframe Selection Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={() => setTimeFrame("daily")}>
          Daily
        </Button>
        <Button variant="contained" onClick={() => setTimeFrame("weekly")}>
          Weekly
        </Button>
        <Button variant="contained" onClick={() => setTimeFrame("monthly")}>
          Monthly
        </Button>
      </Box>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={timeFrame} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default OverSales;
