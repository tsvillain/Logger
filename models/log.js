const mongoose = require("mongoose");
const { Schema } = mongoose;
const logSchema = new Schema({
  dateTime: {
    type: Date,
    default: Date.now,
  },
  logMessage: {
    type: String,
    require: [true, "Log message is Required"],
  },
});

const logModel = mongoose.model("Log", logSchema);

module.exports = logModel;
