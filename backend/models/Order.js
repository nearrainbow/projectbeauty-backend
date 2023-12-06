const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true
    },
    products: [{
      name:  {
        type: String,
        required: true,
      },
      imgUrl:  {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    }],
    address: {
      type: String,
      required: true
    },
    logistic: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    recommender: {
      type: String,
      default: ''
    },
    ship: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model('order', OrderSchema)
module.exports = Order
