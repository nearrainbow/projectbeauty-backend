const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  },
  imageUrl: [{
    type: String,
    required: true,
  }],
  category: {
    type: String,
  },
  sort: {
    type: Number
  }
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
