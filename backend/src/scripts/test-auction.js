import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/database.js";
import Auction from "../models/auction.model.js";

dotenv.config();

async function testAuctionCreate() {
  try {
    await connectDB();

    const auction = await Auction.create({
      title: "2016 Toyota Corolla",
      description: "Reliable used car in good condition.",
      startPrice: 5000,
      reservePrice: 7000,
    });

    console.log("Test auction created successfully:", auction._id);
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

testAuctionCreate();