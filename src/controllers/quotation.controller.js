import { QuotationService } from "../services/quotation.service.js";

export class QuotationController {

  // Create quotation
  static async create(req, res) {
    try {
      const quotation = await QuotationService.createQuotation(
        req.user.id,
        req.body
      );

      return res.status(201).json({
        message: "Quotation created successfully",
        quotation,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Agent: get their quotations
  static async mine(req, res) {
    try {
      const quotations = await QuotationService.getByAgent(req.user.id);
      return res.status(200).json(quotations);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Admin + SuperAdmin: get all quotations
  static async getAll(req, res) {
    try {
      const quotations = await QuotationService.getAll();
      return res.status(200).json(quotations);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Get by ID
  static async getById(req, res) {
    try {
      const quotation = await QuotationService.getById(req.params.id);
      return res.status(200).json(quotation);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Update quotation
  static async update(req, res) {
    try {
      const updated = await QuotationService.update(req.params.id, req.body);
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Delete quotation
  static async delete(req, res) {
    try {
      await QuotationService.delete(req.params.id);
      return res.status(200).json({ message: "Quotation deleted" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Regenerate PDF
  static async regeneratePdf(req, res) {
    try {
      const result = await QuotationService.regeneratePdf(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
