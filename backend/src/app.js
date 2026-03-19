import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

// keeps request bodies from growing out of control
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

// gives unknown routes a clean API response
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;