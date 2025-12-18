import Quotation from "./quotation.model.js";
import QuotationHotel from "../quotationHotel/quotationHotel.model.js";

export default class QuotationService {




  static async addHotelToQuotationService(quotationId, hotelData) {

    const { hotelId, hotelName, roomType, pricePerNight, nights, rooms } = hotelData;

    // Step 1: Check quotation exists
    const quotation = await Quotation.findById(quotationId);
    if (!quotation) {
      return { success: false, message: "Quotation not found" };
    }

    // Step 2: Create QuotationHotel entry
    const quotationHotel = await QuotationHotel.create({
      quotationId,
      hotelId,
      hotelName,
      roomType,
      pricePerNight,
      nights,
      rooms,
      totalCost: pricePerNight * nights * rooms
    });

    // Step 3: Push ID inside quotation.hotels array
    quotation.hotels.push(quotationHotel._id);

    // Auto update quotation total cost
    quotation.totalCost += quotationHotel.totalCost;
    await quotation.save();

    return {
      success: true,
      quotationHotel
    };
  };


  // Get all quotations
  static async getAllQuotations() {
    return await Quotation.find().populate("hotels");
  }

  // Get one quotation
  static async getQuotationById(id) {
    return await Quotation.findById(id).populate("hotels");
  }

  // Update
  static async updateQuotation(id, data) {
    return await Quotation.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete
  static async deleteQuotation(id) {
    // Delete hotels under this quotation
    await QuotationHotel.deleteMany({ quotationId: id });

    return await Quotation.findByIdAndDelete(id);
  }
}
