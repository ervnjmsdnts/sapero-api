import { model, Schema } from "mongoose";

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specification: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["rented", "reserved", "available"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Car", carSchema);
