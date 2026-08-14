import express from "express";
import mongoose from "mongoose";
import Destination from "../models/Destination.js";

const router = express.Router();

// ======================================================
// GET ALL DESTINATIONS
// GET /api/destinations
// ======================================================

router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE DESTINATION
// GET /api/destinations/:id
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Requested destination:", id);

    let destination = null;

    // --------------------------------------------------
    // 1. Search by MongoDB ObjectId
    // --------------------------------------------------

    if (mongoose.Types.ObjectId.isValid(id)) {
      destination = await Destination.findById(id);
    }

    // --------------------------------------------------
    // 2. Search by destination slug/name
    // Example:
    // gokarna -> Gokarna
    // araku-valley -> Araku Valley
    // hundru-falls -> Hundru Falls
    // --------------------------------------------------

    if (!destination) {
      const destinationName = id
        .replace(/-/g, " ")
        .trim();

      console.log(
        "Searching destination name:",
        destinationName
      );

      destination = await Destination.findOne({
        name: {
          $regex: `^${destinationName}$`,
          $options: "i",
        },
      });
    }

    // --------------------------------------------------
    // 3. Not found
    // --------------------------------------------------

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
        requestedId: id,
      });
    }

    // --------------------------------------------------
    // 4. Success
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error(
      "Error fetching destination:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch destination",
      error: error.message,
    });
  }
});

// ======================================================
// CREATE DESTINATION
// POST /api/destinations
// ======================================================

router.post("/", async (req, res) => {
  try {
    const destination = await Destination.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination,
    });
  } catch (error) {
    console.error(
      "Error creating destination:",
      error
    );

    res.status(400).json({
      success: false,
      message: "Failed to create destination",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE DESTINATION
// PUT /api/destinations/:id
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID",
      });
    }

    const destination =
      await Destination.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      data: destination,
    });
  } catch (error) {
    console.error(
      "Error updating destination:",
      error
    );

    res.status(400).json({
      success: false,
      message: "Failed to update destination",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE DESTINATION
// DELETE /api/destinations/:id
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID",
      });
    }

    const destination =
      await Destination.findByIdAndDelete(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting destination:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete destination",
      error: error.message,
    });
  }
});

// ======================================================
// EXPORT ROUTER
// ======================================================

export default router;