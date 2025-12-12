import mongoose from "mongoose";

const hotelFacilitySchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    // Facility Name (e.g., "Free WiFi", "Swimming Pool", "Parking")
    name: { type: String, required: true },

    // Facility icon (optional) → can store icon name or URL
    icon: { type: String },

    // Short description (optional)
    description: { type: String },

    // Optional category → you can group facilities (Popular / Safety / Room Features)
    category: {
      type: String,
      enum: ["POPULAR", "ROOM", "SAFETY", "DINING", "GENERAL", "OTHER"],
      default: "POPULAR",
    },

    // If the hotel charges extra for this facility
    isPaid: { type: Boolean, default: false },

    // If paid, store price
    price: { type: Number, default: 0 },

    // ⭐ Store Multiple Images
    images: [
      {
        type: String, // URL or file path of image
      },
    ],

    // Visibility
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("HotelFacility", hotelFacilitySchema);
