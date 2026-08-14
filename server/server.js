import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import destinationRoutes from "./routes/destinationRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// ======================================================
// ROOT ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TravelBharat Backend is running 🚀",
  });
});

// ======================================================
// DESTINATION ROUTES
// ======================================================

app.use(
  "/api/destinations",
  destinationRoutes
);

// ======================================================
// STATE ROUTES
// ======================================================

app.use(
  "/api/states",
  stateRoutes
);

// ======================================================
// ADMIN ROUTES
// ======================================================

app.use(
  "/api/admin",
  adminRoutes
);

// ======================================================
// MONGODB CONNECTION
// ======================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB connected successfully ✅"
    );

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `TravelBharat backend running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed ❌"
    );

    console.error(error.message);
  });