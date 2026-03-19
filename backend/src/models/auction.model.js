import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    startPrice: {
      type: Number,
      required: [true, "Start price is required"],
      min: [0, "Start price cannot be negative"],
    },
    reservePrice: {
      type: Number,
      required: [true, "Reserve price is required"],
      min: [0, "Reserve price cannot be negative"],
      validate: {
        validator(value) {
          return value >= this.startPrice;
        },
        message: "Reserve price must be greater than or equal to start price",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;