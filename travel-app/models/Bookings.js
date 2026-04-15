const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  date: String,
  service: String
});

module.exports = mongoose.model("Booking", bookingSchema);