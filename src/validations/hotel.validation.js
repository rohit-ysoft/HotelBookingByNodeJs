import Joi from "joi";

export const createHotelSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  starRating: Joi.number().min(1).max(5).required(),
  description: Joi.string().allow(""),
  pricePerNight: Joi.number().required(),
  amenities: Joi.array().items(Joi.string()).default([]),
});

export const updateHotelSchema = Joi.object({
  name: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  starRating: Joi.number().min(1).max(5),
  description: Joi.string(),
  pricePerNight: Joi.number(),
  amenities: Joi.array().items(Joi.string()),
  isActive: Joi.boolean(),
});
