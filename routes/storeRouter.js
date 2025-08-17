

// Core Modules
const path = require('path');

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");
const storeController=require('../controllers/storeController')

storeRouter.get("/",storeController.homeList);
storeRouter.get("/favourite",storeController.favourite);
storeRouter.get("/home/:homeid",storeController.details);
storeRouter.post("/favourite",storeController.addFavourite);
storeRouter.post("/deleteFavourite",storeController.deleteFavourite);
storeRouter.get("/bookings",storeController.showBookings);
storeRouter.post("/bookings",storeController.addBookings);
storeRouter.post("/deleteBookings",storeController.deleteBookings);


module.exports = storeRouter;