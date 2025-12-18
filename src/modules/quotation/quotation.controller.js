import QuotationService from "../services/quotationService.js";

export const QuotationController = {

  async create(req, res) {
    try {
      const q = await QuotationService.createQuotation(req.body);
      res.status(201).json({ success: true, data: q });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await QuotationService.getAllQuotations();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await QuotationService.getQuotationById(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const data = await QuotationService.updateQuotation(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      await QuotationService.deleteQuotation(req.params.id);
      res.json({ success: true, message: "Quotation deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
