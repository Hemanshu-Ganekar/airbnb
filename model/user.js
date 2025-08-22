const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['guest', 'host'],
    },
    password: {
        type: String,
        required: true,
    },
    favourite:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'home'
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings'
    }],
  hostedHomes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'home'
  }]
});

module.exports = mongoose.model('user', userSchema);