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

// keeps unknown endpoints consistent with the rest of the API's JSON error format
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ensures unhandled errors return a consistent API response
app.use((error, req, res, next) => {
  console.error("Unhandled app error:", error.message);

  res.status(500).json({
    error: "Internal server error",
  });
});

export default app;
