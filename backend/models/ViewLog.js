const mongoose = require("mongoose");

const viewLogSchema = mongoose.Schema({
  date: {
    type: String,
    unique: true,
    required: true,
  },
  view: {
    type: Number,
    default: 0,
  }
});

const ViewLog = mongoose.model("viewlog", viewLogSchema);
module.exports = ViewLog;
