const { model, Schema } = require("mongoose");

const reservedSchema = new Schema(
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
    dateOfReservation: {
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

module.exports = model("Reserved", reservedSchema);
