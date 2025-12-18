import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    // Display name shown in autocomplete
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // Normalized value for search (lowercase)
    searchName: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    // City / State / Country breakdown
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },

    // Type of location
    type: {
      type: String,
      enum: ["city", "hotel", "airport", "area", "landmark"],
      required: true,
    },

    // Geo location (for nearby search)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
    },

    // External API reference (Google / Mapbox)
    placeId: {
      type: String,
      index: true,
    },

    // Popularity score (sorting autocomplete)
    popularity: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("location", LocationSchema);


