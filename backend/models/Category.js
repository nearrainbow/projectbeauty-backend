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
  image: {
    type: String,
    required: true
  },
  sort: {
    type: Number
  }
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
