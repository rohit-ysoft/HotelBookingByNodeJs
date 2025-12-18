

import mongoose from "mongoose";

const quotationHotelSchema = new mongoose.Schema(
  {
    quotationId: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },

    roomType: String,
    pricePerNight: Number,
    nights: Number,
    rooms: Number,

    totalCost: Number, // pricePerNight * nights * rooms OR custom
    customNotes: String
  },
  { timestamps: true }
);

export default mongoose.model("QuotationHotel", quotationHotelSchema);
