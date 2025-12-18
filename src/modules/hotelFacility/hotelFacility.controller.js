// controllers/hotelFacility.controller.js
import {
  createFacility,
  getFacilitiesByHotel,
  getFacilityById,
  updateFacility,
  deleteFacility
} from "./hotelFacility.service.js";

export const addFacility = async (req, res) => {
  try {
    console.log("THis is hotel facility registration data =>", req.body);

    // Convert uploaded images to schema format
    const images = (req.files || []).map(file => ({
      url: "/uploads/hotels/hotelFacility/" + file.filename,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date()
    }));

    const hotelFacilityData = {
      hotelId: req.body.hotelId,            // REQUIRED
      name: req.body.name,                  // REQUIRED
      description: req.body.description,    // optional
      category: req.body.category,          // POPULAR / ROOM / SAFETY / etc
      isPaid: req.body.isPaid === "true" || req.body.isPaid === true,
      price: req.body.price || 0,
      icon: req.file ? req.file.path : null, // single icon image
      images: images || [],                 // multiple images paths
      isActive: req.body.isActive ?? true,
    };

    const facility = await createFacility(hotelFacilityData);
    console.log("THis is hotel facility registration data =>", facility);
    res.status(201).json({ isSuccess: true, data: facility });
  } catch (error) {
    console.log({ isSuccess: false, message: error.message });
  }
};

export const getHotelFacilities = async (req, res) => {
  try {
    const facilities = await getFacilitiesByHotel(req.params.hotelId);
    res.status(200).json({ isSuccess: true, data: facilities });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

export const getSingleFacility = async (req, res) => {
  try {
    const facility = await getFacilityById(req.params.id);
    if (!facility) return res.status(404).json({ isSuccess: false, message: "Facility not found" });

    res.status(200).json({ isSuccess: true, data: facility });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

export const editFacility = async (req, res) => {
  try {
    const facility = await updateFacility(req.params.id, req.body);
    res.status(200).json({ isSuccess: true, data: facility });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

export const removeFacility = async (req, res) => {
  try {
    await deleteFacility(req.params.id);
    res.status(200).json({ isSuccess: true, message: "Facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
