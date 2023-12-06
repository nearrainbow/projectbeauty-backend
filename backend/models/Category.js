const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  },
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
