import HotelSearch from "./hotelSearch.model.js";
import LocationModel from "./location.model.js";
import locationModel from "./location.model.js";

export class HotelSearchService {
  // CREATE
  static async createSearch(data) {
    return await HotelSearch.create(data);
  }

  // READ - All Searches (with pagination)
  static async getAllSearches({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const searches = await HotelSearch.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "fullName email");

    const total = await HotelSearch.countDocuments();

    return { total, page, limit, searches };
  }

  // READ - By ID
  static async getSearchById(id) {
    return await HotelSearch.findById(id).populate(
      "userId",
      "fullName email"
    );
  }

  // UPDATE
  static async updateSearch(id, data) {
    return await HotelSearch.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  static async deleteSearch(id) {
    return await HotelSearch.findByIdAndDelete(id);
  }

  // READ - By User
  static async getSearchByUser(userId) {
    return await HotelSearch.find({ userId }).sort({ createdAt: -1 });
  }


  static async createautocompleteLocation(locationData)
 {
  return await LocationModel.create(locationData);
 }

static async autocomplete(query) {
  if (!query) return [];

  // ✅ Normalize query
  const safeQuery = query.trim().toLowerCase();

  console.log("Normalized query =>", safeQuery);

  // 🔹 Filter based on DB structure
  const filter = {
    isActive: true,
    $or: [
      { searchName: { $regex: `^${safeQuery}`, $options: "i" } },
      { name: { $regex: `^${safeQuery}`, $options: "i" } },
    ],
  };

  // 🔹 Query DB
  const locations = await locationModel.find({});
    // .sort({ popularity: -1 })
    // .limit(10);

  console.log("DB locations found =>", locations);

  // 🔹 If still empty, log DB data for debug
  if (!locations.length) {
    console.warn("No matching location found for:", safeQuery);
  }

  return locations.map((loc) => ({
    name: loc.name,
    city: loc.city,
    state: loc.state,
    country: loc.country,
    type: loc.type,
  }));
}



}

