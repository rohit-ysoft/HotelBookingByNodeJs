import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    address: String,
    city: String,
    state: String,
    country: String,
    rating: Number,
    pricePerNight: Number,
    currency: { type: String, default: "USD" },
       
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

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
