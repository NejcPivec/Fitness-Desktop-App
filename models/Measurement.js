const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Id is required"],
  },
  weight: {
    type: String,
    trim: true,
  },
  skin: {
    type: String,
    trim: true,
  },
  fat: {
    type: String,
    trim: true,
  },
  muscle: {
    type: String,
    trim: true,
  },
  fat_part: {
    type: String,
    trim: true,
  },
  waist: {
    type: String,
    trim: true,
  },
  itm: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
  },
});

module.exports = mongoose.model("Measurement", MeasurementSchema);
