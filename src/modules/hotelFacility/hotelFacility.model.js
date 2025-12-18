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

    // ⭐ Image Upload: store detailed info
    images: [
      {
        url: { type: String },        // Cloudinary or local file URL
        filename: { type: String },   // original filename
        size: { type: Number },       // file size in KB/MB
        mimetype: { type: String },   // image/jpeg, image/png etc.
        uploadedAt: { type: Date, default: Date.now }
      }
    ],

    // Visibility
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("HotelFacility", hotelFacilitySchema);
