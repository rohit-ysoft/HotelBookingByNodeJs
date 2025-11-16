import { Hotel, HotelMedia } from "../models/hotel.model.js";

export class HotelService {
  // Create hotel
  static async createHotel(data) {
    return await Hotel.create(data);
  }

  // Update hotel
  static async updateHotel(id, data) {
    return await Hotel.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete hotel
  static async deleteHotel(id) {
    await HotelMedia.deleteMany({ hotel: id }); // remove media
    return await Hotel.findByIdAndDelete(id);
  }

  // Get all hotels (agent + admin)
  static async getAllHotels(query) {
    const filter = {};

    if (query.city) filter.city = query.city;
    if (query.country) filter.country = query.country;
    if (query.starRating) filter.starRating = query.starRating;

    return await Hotel.find(filter).populate("medias");
  }

  // Get single hotel
  static async getHotelById(id) {
    return await Hotel.findById(id).populate("medias");
  }

  // Add media to hotel
  static async addHotelMedia(hotelId, mediaData) {
    const media = await HotelMedia.create({
      hotel: hotelId,
      ...mediaData
    });

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { medias: media._id }
    });

    return media;
  }
}
