import QuotationHotel from "../models/quotationHotel.model.js";
import Quotation from "../models/quotation.model.js";

export default class QuotationHotelService {

  static async addHotelToQuotation(data) {
    const qHotel = await QuotationHotel.create(data);

    // Push to quotation.hotels array
    await Quotation.findByIdAndUpdate(
      data.quotationId,
      { $push: { hotels: qHotel._id } }
    );

    return qHotel;
  }

  static async getHotelsByQuotation(quotationId) {
    return await QuotationHotel.find({ quotationId });
  }

  static async getById(id) {
    return await QuotationHotel.findById(id);
  }

  static async update(id, data) {
    return await QuotationHotel.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    const hotel = await QuotationHotel.findById(id);

    if (hotel) {
      // Remove reference from Quotation model
      await Quotation.findByIdAndUpdate(
        hotel.quotationId,
        { $pull: { hotels: id } }
      );
    }

    return await QuotationHotel.findByIdAndDelete(id);
  }
}
