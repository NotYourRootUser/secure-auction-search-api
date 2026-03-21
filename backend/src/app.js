import express from "express";
import cors from "cors";
import auctionRoutes from "./routes/auction.routes.js";

const app = express();

app.use(cors());

// keeps request bodies from growing out of control
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

app.use("/api/auctions", auctionRoutes);

// gives unknown routes a clean API response
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;