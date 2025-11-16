import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
    {
        agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        guestName: { type: String, required: true },
        totalGuests: { type: Number, required: true },

        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },

        nights: { type: Number, required: true },

        hotels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "QuotationHotel"
            }
        ],

        baseCost: { type: Number, required: true },
        markupAmount: { type: Number, default: 0 },
        totalPrice: { type: Number, required: true },

        pdfUrl: { type: String },

        status: { type: String, enum: ["DRAFT", "FINAL"], default: "DRAFT" }
    },
    { timestamps: true }
);


const quotationHotelSchema = new mongoose.Schema(
    {
        quotation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quotation",
            required: true
        },

        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            required: true
        },

        pricePerNight: { type: Number, required: true },
        numberOfRooms: { type: Number, required: true },
        nights: { type: Number, required: true },

        totalHotelCost: { type: Number, required: true }
    },
    { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);
const QuotationHotel = mongoose.model("QuotationHotel", quotationHotelSchema);

export { Quotation, QuotationHotel };
