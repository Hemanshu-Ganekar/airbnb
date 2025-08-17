// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");
const hostController=require("../controllers/host.Controller.js");

hostRouter.get("/add-home",hostController.getHome);
hostRouter.post("/add-home",hostController.PostHome);
hostRouter.get("/hostedHomes",hostController.hostedHomes);
hostRouter.get("/editHome/:id",hostController.getEditHome);
hostRouter.post("/editHome",hostController.postEditHome);
hostRouter.post("/deleteHost",hostController.deleteHostedHome);
exports.hostRouter = hostRouter;