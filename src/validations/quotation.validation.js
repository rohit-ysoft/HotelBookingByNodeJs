import Joi from "joi";

export const createQuotationSchema = Joi.object({
  guestName: Joi.string().required(),
  totalGuests: Joi.number().min(1).required(),

  checkIn: Joi.date().required(),
  checkOut: Joi.date().greater(Joi.ref("checkIn")).required(),

  hotels: Joi.array()
    .items(
      Joi.object({
        hotel: Joi.string().required(), // hotel ID
        pricePerNight: Joi.number().required(),
        numberOfRooms: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),

  markupAmount: Joi.number().min(0).default(0),
});
