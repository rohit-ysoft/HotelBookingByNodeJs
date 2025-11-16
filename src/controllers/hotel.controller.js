import { HotelService } from "../services/hotel.service.js";

export class HotelController {
  // Create Hotel — ADMIN + SUPERADMIN
  static async create(req, res) {
    try {
      const hotel = await HotelService.createHotel(req.body);
      return res.status(201).json({ message: "Hotel created", hotel });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Update hotel
  static async update(req, res) {
    try {
      const hotel = await HotelService.updateHotel(req.params.id, req.body);
      return res.status(200).json(hotel);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Delete hotel
  static async delete(req, res) {
    try {
      await HotelService.deleteHotel(req.params.id);
      return res.status(200).json({ message: "Hotel deleted" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Get all hotels (Agent + Admin)
  static async getAll(req, res) {
    try {
      const hotels = await HotelService.getAllHotels(req.query);
      return res.status(200).json(hotels);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Get single hotel
  static async getById(req, res) {
    try {
      const hotel = await HotelService.getHotelById(req.params.id);
      return res.status(200).json(hotel);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Add media (image) to hotel
  static async addMedia(req, res) {
    try {
      const media = await HotelService.addHotelMedia(req.params.id, {
        url: req.body.url,
        isPrimary: req.body.isPrimary,
      });

      return res.status(201).json({ message: "Media added", media });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
