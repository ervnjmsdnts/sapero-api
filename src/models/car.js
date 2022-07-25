const { model, Schema } = require("mongoose");

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
