// services/hotelFacility.service.js
import HotelFacility from "../models/hotelFacility.model.js";

export const createFacility = async (data) => {
  console.log("This is hotel Facility service data =>",data);
  return await HotelFacility.create(data);
};

export const getFacilitiesByHotel = async (hotelId) => {
  return await HotelFacility.find({ hotelId, isActive: true });
};

export const getFacilityById = async (id) => {
  return await HotelFacility.findById(id);
};

export const updateFacility = async (id, data) => {
  return await HotelFacility.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFacility = async (id) => {
  return await HotelFacility.findByIdAndDelete(id);
};
