import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import Auction from "../models/auction.model.js";

dotenv.config();

async function clearAuctions() {
  try {
    await connectDB();
    console.log("Connected to DB");

    console.log("Collection name:", Auction.collection.name);

    // clear all auction documents so local testing starts from an empty state
    const deleted = await Auction.deleteMany({});
    console.log("Deleted documents:", deleted.deletedCount);

    const total = await Auction.countDocuments();
    console.log("Total documents in collection:", total);

    console.log("Auction data cleared successfully");
  } catch (error) {
    console.error("Failed to clear auction data:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

clearAuctions();
