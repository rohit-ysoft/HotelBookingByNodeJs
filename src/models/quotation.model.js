import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    customerName: String,
    customerEmail: String,
    checkIn: Date,
    checkOut: Date,
    noOfNights: Number,
    totalCost: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // ⭐ Real-world correct relation: Stores QuotationHotel references
    hotels: [
      { type: mongoose.Schema.Types.ObjectId, ref: "QuotationHotel" }
    ],
    notes: String,
    status: { type: String, default: "DRAFT" }
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", quotationSchema);
