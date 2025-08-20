const mongoose = require("mongoose");
const favourite = require("./favourite");
const bookings = require("./bookings");
 
//id is automatically added by mongodb
const homeSchema = new mongoose.Schema({
houseName:{type:String,required:true},
pricePerNight:{type:Number,required:true},
location:{type:String,required:true},
Rating:{type:Number,required:true},
Photo:{type:String},
description:{type:String}
});
homeSchema.pre('findOneAndDelete',async function(next){
 const homeId=this.getQuery()._id;
 await favourite.deleteMany({id:homeId});
 await bookings.deleteMany({id:homeId});
 next();
});
module.exports= mongoose.model('Home',homeSchema);