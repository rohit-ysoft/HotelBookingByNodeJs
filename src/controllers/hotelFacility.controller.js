// controllers/hotelFacility.controller.js
import {
  createFacility,
  getFacilitiesByHotel,
  getFacilityById,
  updateFacility,
  deleteFacility
} from "../services/hotelFacility.service.js";

export const addFacility = async (req, res) => {
  try {
    const facility = await createFacility(req.body);
    console.log("THis is hotel facility registration data =>",facility);
    res.status(201).json({ isSuccess: true, data: facility });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error.message });
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
