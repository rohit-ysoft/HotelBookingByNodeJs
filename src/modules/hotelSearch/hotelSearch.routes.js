import express from "express";
import { HotelSearchController } from "./hotelSearch.controller.js";


const hotelSearchRoutes = express.Router();

hotelSearchRoutes.post("/", HotelSearchController.create);           // Create
hotelSearchRoutes.get("/", HotelSearchController.getAll);            // Get All
hotelSearchRoutes.get("/:id", HotelSearchController.getById);        // Get By ID
hotelSearchRoutes.put("/:id", HotelSearchController.update);         // Update
hotelSearchRoutes.delete("/:id", HotelSearchController.delete);      // Delete
hotelSearchRoutes.get("/user/:userId", HotelSearchController.getByUser); // User Searches
hotelSearchRoutes.get("/locations/autocomplete", HotelSearchController.autocomplete);
hotelSearchRoutes.post("/locations/createLocation", HotelSearchController.createLocation);


export default hotelSearchRoutes;
