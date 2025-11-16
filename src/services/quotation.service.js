import { Quotation, QuotationHotel } from "../models/quotation.model.js";
import { Hotel } from "../models/hotel.model.js";

export class QuotationService {
  
  // Calculate nights
  static calculateNights(checkIn, checkOut) {
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Create Quotation
  static async createQuotation(agentId, data) {
    const { guestName, totalGuests, checkIn, checkOut, hotels, markupAmount } = data;

    // Calculate nights
    const nights = this.calculateNights(checkIn, checkOut);

    // Step 1: Create Initial Quotation (empty hotels list)
    const quotation = await Quotation.create({
      agent: agentId,
      guestName,
      totalGuests,
      checkIn,
      checkOut,
      nights,
      hotels: [],
      baseCost: 0,
      markupAmount,
      totalPrice: 0,
      status: "DRAFT",
    });

    let baseCost = 0;
    const quotationHotelIds = [];

    // Step 2: Create snapshot for each hotel
    for (const h of hotels) {
      const hotelData = await Hotel.findById(h.hotel);
      if (!hotelData) throw new Error("Hotel not found");

      const totalHotelCost = h.pricePerNight * h.numberOfRooms * nights;

      const qh = await QuotationHotel.create({
        quotation: quotation._id,
        hotel: h.hotel,
        pricePerNight: h.pricePerNight,
        numberOfRooms: h.numberOfRooms,
        nights,
        totalHotelCost,
      });

      quotationHotelIds.push(qh._id);
      baseCost += totalHotelCost;
    }

    // Step 3: Final Calculation
    const totalPrice = baseCost + (markupAmount ?? 0);

    // Step 4: Update Quotation
    quotation.hotels = quotationHotelIds;
    quotation.baseCost = baseCost;
    quotation.totalPrice = totalPrice;

    await quotation.save();

    return quotation;
  }

  // Get All Quotations (Admin + SuperAdmin)
  static async getAll() {
    return await Quotation.find()
      .populate("agent", "fullName email")
      .populate({
        path: "hotels",
        populate: { path: "hotel" },
      });
  }

  // Get Quotations by Agent
  static async getByAgent(agentId) {
    return await Quotation.find({ agent: agentId })
      .populate({
        path: "hotels",
        populate: { path: "hotel" },
      });
  }

  // Get single quotation
  static async getById(id) {
    return await Quotation.findById(id).populate({
      path: "hotels",
      populate: { path: "hotel" },
    });
  }

  // Update quotation (markup only)
  static async update(id, data) {
    const quotation = await Quotation.findById(id);
    if (!quotation) throw new Error("Quotation not found");

    quotation.markupAmount = data.markupAmount ?? quotation.markupAmount;
    quotation.totalPrice = quotation.baseCost + quotation.markupAmount;

    return await quotation.save();
  }

  // Delete quotation
  static async delete(id) {
    await QuotationHotel.deleteMany({ quotation: id });
    return await Quotation.findByIdAndDelete(id);
  }

  // Placeholder for PDF generation
  static async regeneratePdf(id) {
    const quotation = await Quotation.findById(id);
    if (!quotation) throw new Error("Quotation not found");

    // PDF logic goes here

    return quotation;
  }
}
