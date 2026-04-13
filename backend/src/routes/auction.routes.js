import express from "express";
import Auction from "../models/auction.model.js";

const router = express.Router();

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.trim();

    // reject empty searches so the endpoint only runs with a real keyword
    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const regex = new RegExp(escapeRegex(query), "i");

    const results = await Auction.find({
      $or: [{ title: regex }, { description: regex }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Auction search failed:", error.message);

    return res.status(500).json({
      error: "Failed to search auction items",
    });
  }
});

export default router;