const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const userRoutes = require("./src/routes/users/handler");
const authRoutes = require("./src/routes/auth/handler");
const carRoutes = require("./src/routes/cars/handler");

(async () => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  await mongoose.connect(
    "mongodb+srv://oduum:Kq4KhKKrnlK1uz6H@sapero.ayykp.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB Connected");

  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/cars", carRoutes);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
