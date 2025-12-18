import multer from "multer";

/* ================= HOTEL IMAGE UPLOAD ================= */

const hotelStorage = multer.diskStorage({
  destination: "uploads/hotels/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadHotel = multer({ storage: hotelStorage });


/* ============== HOTEL FACILITY IMAGE UPLOAD ============== */

const hotelFacilityStorage = multer.diskStorage({
  destination: "uploads/hotels/hotelFacility/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadHotelFacility = multer({
  storage: hotelFacilityStorage,
});
