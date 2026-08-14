import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Destination from "../models/Destination.js";
import { states } from "../../src/data/states.js";

dotenv.config();

const importDestinations = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Remove existing destinations
    await Destination.deleteMany();

    // Convert states → destinations
    const destinations = states.flatMap((state) =>
      state.places.map((place) => ({
        name: place.name,
        stateId: state.id,
        stateName: state.name,
        category: place.category,
        description: place.description,
        image: place.image,
        gallery: place.gallery || [],
        location: place.location || "",
        bestTimeToVisit: place.bestTimeToVisit || "",
        entryFeesAndTimings:
          place.entryFeesAndTimings || "",
        nearbyAttractions:
          place.nearbyAttractions || [],
      }))
    );

    // Insert into MongoDB
    await Destination.insertMany(destinations);

    console.log(
      `✅ ${destinations.length} destinations imported successfully!`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Import failed:");
    console.error(error.message);

    process.exit(1);
  }
};

importDestinations();