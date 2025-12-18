import { HotelSearchService } from "./hotelSearch.service.js";

export class HotelSearchController {
  // CREATE
  static async create(req, res) {
    try {
      const data = {
        ...req.body,
        userId: req.user?._id || null,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      };

      const result = await HotelSearchService.createSearch(data);

      res.status(201).json({
        success: true,
        message: "Hotel search saved successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET ALL
  static async getAll(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await HotelSearchService.getAllSearches({
        page,
        limit,
      });

      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET BY ID
  static async getById(req, res) {
    try {
      const result = await HotelSearchService.getSearchById(req.params.id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Search record not found",
        });
      }

      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const result = await HotelSearchService.updateSearch(
        req.params.id,
        req.body
      );

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Search record not found",
        });
      }

      res.json({
        success: true,
        message: "Search updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const result = await HotelSearchService.deleteSearch(req.params.id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Search record not found",
        });
      }

      res.json({
        success: true,
        message: "Search deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET BY USER
  static async getByUser(req, res) {
    try {
      const result = await HotelSearchService.getSearchByUser(req.params.userId);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

   // CREATE
  static async createLocation(req, res) {
    try {
      const result = await HotelSearchService.createautocompleteLocation(req.body);
      res.status(201).json({
        success: true,
        message: "Hotel search saved successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ✅ AUTOCOMPLETE LOCATION
  static async autocomplete(req, res) {
    try {
      const { q } = req.query;
        console.log("search query =>",q);
      // if (!q) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Query required",
      //   });
      // }

      const locations = await HotelSearchService.autocomplete(q);

      res.json({
        success: true,
        data: locations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
