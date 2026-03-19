import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import Auction from "../models/auction.model.js";
import seedData from "./seed-data.js";

dotenv.config();

async function seedAuctions() {
  try {
    await connectDB();
    console.log("Connected to DB");

    console.log("Collection name:", Auction.collection.name);
    console.log("Seed count:", seedData.length);

    if (!Array.isArray(seedData) || seedData.length === 0) {
      throw new Error("Seed data is empty or invalid");
    }

    // reset collection so local testing starts from a known state
    const deleted = await Auction.deleteMany({});
    console.log("Deleted documents:", deleted.deletedCount);

    const inserted = await Auction.insertMany(seedData);
    console.log("Inserted documents:", inserted.length);

    const total = await Auction.countDocuments();
    console.log("Total documents in collection:", total);

    console.log("Auction seed completed successfully");
  } catch (error) {
    console.error("Failed to seed auction data:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedAuctions();
