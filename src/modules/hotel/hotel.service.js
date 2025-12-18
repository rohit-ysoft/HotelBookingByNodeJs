import Hotel from "./hotel.model.js";

export default class HotelService {

  static async create(data) {
    const hotel = await Hotel.create(data);
    return hotel;
  }

  static async getAll() {
    return await Hotel.find();
  }

  static async getById(id) {
    console.log("Fetching hotel with ID:", id); // Debugging line
    return await Hotel.findById(id);
  }

  static async update(id, data) {
    console.log("Updating hotel with ID:", id, "Data:", data); // Debugging line
    return await Hotel.findByIdAndUpdate(id, data, { new: true });
  }

  static async remove(id) {
    return await Hotel.findByIdAndDelete(id);
  }
}
