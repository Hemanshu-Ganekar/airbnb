const mongoose = require("mongoose");
 
//id is automatically added by mongodb
const homeSchema = new mongoose.Schema({
houseName:{type:String,required:true},
pricePerNight:{type:Number,required:true},
location:{type:String,required:true},
Rating:{type:Number,required:true},
Photo:{type:String},
description:{type:String}
});
 
module.exports= mongoose.model('Home',homeSchema);