import HotelService from "../services/hotelService.js";

export const HotelController = {

async create(req, res) {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    // Convert uploaded images to schema format
    const images = (req.files || []).map(file => ({
      url: "/uploads/hotels/" + file.filename,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date()
    }));

    const hotelData = {
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      rating: req.body.rating,
      pricePerNight: req.body.pricePerNight,
      currency: req.body.currency,
      images: images
    };

    const hotel = await HotelService.create(hotelData);

    return res.status(201).json({
      isSuccess: true,
      message: "Hotel created successfully",
      data: hotel
    });

  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message
    });
  }
},


  async getAll(req, res) {
    try {
      const hotels = await HotelService.getAll();
      return res.json({ success: true, data: hotels });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    console.log("GetById called with ID:", req.query.id); // Debugging line
    try {
      const hotel = await HotelService.getById(req.query.id);
      if (!hotel) return res.status(404).json({ isSuccess: false, message: "Hotel not found" });
      return res.json({ isSuccess: true, data: hotel });
    } catch (err) {
      return res.status(500).json({ isSuccess: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const hotel = await HotelService.update(req.query.id, req.body);
      console.log("Updated hotel:", hotel); // Debugging line
      return res.json({ success: true, data: hotel });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      await HotelService.remove(req.params.id);
      return res.json({ success: true, message: "Hotel deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

};
