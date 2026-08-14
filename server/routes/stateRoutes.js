import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

// ======================================================
// GET ALL STATES
// GET /api/states
// ======================================================

router.get("/", async (req, res) => {
  try {
    const states = await Destination.aggregate([
      {
        $group: {
          _id: "$stateId",
          stateName: {
            $first: "$stateName",
          },
          destinationCount: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          stateName: 1,
        },
      },
    ]);

    const formattedStates = states.map((state) => ({
      stateId: state._id,
      stateName: state.stateName,
      destinationCount: state.destinationCount,
    }));

    res.status(200).json({
      success: true,
      count: formattedStates.length,
      data: formattedStates,
    });
  } catch (error) {
    console.error("Error fetching states:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch states",
      error: error.message,
    });
  }
});

// ======================================================
// GET DESTINATIONS BY STATE
// GET /api/states/:stateId/destinations
// ======================================================

router.get("/:stateId/destinations", async (req, res) => {
  try {
    const { stateId } = req.params;

    const destinations = await Destination.find({
      stateId: stateId,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error(
      "Error fetching destinations by state:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations for state",
      error: error.message,
    });
  }
});

// ======================================================
// EXPORT ROUTER
// ======================================================

export default router;