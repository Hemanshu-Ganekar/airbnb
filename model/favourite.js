const { MongoOIDCError } = require('mongodb');
const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
id:{type:mongoose.Schema.Types.ObjectId,
    ref:'Home',
    unique:true,
    required:true},
});
module.exports=mongoose.model('favourite',favouriteSchema);
