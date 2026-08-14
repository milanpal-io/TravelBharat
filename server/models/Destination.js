import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    stateId: {
      type: String,
      required: true,
      trim: true,
    },

    stateName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    bestTimeToVisit: {
      type: String,
      default: "",
      trim: true,
    },

    entryFeesAndTimings: {
      type: String,
      default: "",
      trim: true,
    },

    nearbyAttractions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model(
  "Destination",
  destinationSchema
);

export default Destination;