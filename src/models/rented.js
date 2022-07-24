import { model, Schema } from "mongoose";

const rentedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["on-going, finished"],
      default: "on-going",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Rented", rentedSchema);
