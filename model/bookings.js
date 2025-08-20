const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
id:{type:mongoose.Schema.Types.ObjectId,
  ref:'Home',  
  required:true,
    unique:true,
    },
});
module.exports=mongoose.model('booking',bookingSchema);
