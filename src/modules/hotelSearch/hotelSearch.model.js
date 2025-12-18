import mongoose from "mongoose";

const hotelSearchSchema = new mongoose.Schema(
  {
    // 🔗 User Reference (null for guest users)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    // 🔍 Search Keywords
    searchText: {
      type: String,
      trim: true,
      index: true,
    },

    // 📍 Location Details
    location: {
      city: { type: String, index: true },
      state: { type: String },
      country: { type: String, default: "India" },
      latitude: Number,
      longitude: Number,
    },

    // 🏨 Filters Used
    filters: {
      checkInDate: Date,
      checkOutDate: Date,
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
      rooms: { type: Number, default: 1 },

      priceRange: {
        min: Number,
        max: Number,
      },

      rating: Number,
      amenities: [String], // pool, wifi, parking
      hotelType: [String], // resort, villa, budget
    },

    // 📊 Result Info
    totalResults: {
      type: Number,
      default: 0,
    },

    // 🌐 Request Metadata
    ipAddress: String,
    deviceType: {
      type: String,
      enum: ["WEB", "MOBILE", "TABLET"],
      default: "WEB",
    },
    userAgent: String,

    // 🔄 Status
    isRepeatedSearch: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ⚡ Indexes for performance
hotelSearchSchema.index({ createdAt: -1 });
hotelSearchSchema.index({ "location.city": 1 });

const HotelSearch = mongoose.model("HotelSearch", hotelSearchSchema);

export default HotelSearch;
