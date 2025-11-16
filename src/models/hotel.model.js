import mongoose from "mongoose";

//Hotel

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

    starRating: { type: Number, min: 1, max: 5 },
    description: { type: String },

    pricePerNight: { type: Number, required: true },

    amenities: [{ type: String }],

    medias: [{ type: mongoose.Schema.Types.ObjectId, ref: "HotelMedia" }],

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


//Hotel Media

const hotelMediaSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },

    url: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },

    type: { type: String, enum: ["IMAGE"], default: "IMAGE" }
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
const HotelMedia = mongoose.model("HotelMedia", hotelMediaSchema);


export {Hotel,HotelMedia} 
