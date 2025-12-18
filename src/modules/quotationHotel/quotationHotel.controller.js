import QuotationHotelService from "./quotationHotel.service.js";

export const QuotationHotelController = {

  async create(req, res) {
    try {
      const data = await QuotationHotelService.addHotelToQuotation(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getByQuotation(req, res) {
    try {
      const data = await QuotationHotelService.getHotelsByQuotation(req.params.quotationId);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await QuotationHotelService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const data = await QuotationHotelService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      await QuotationHotelService.delete(req.params.id);
      res.json({ success: true, message: "Hotel removed from quotation" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
