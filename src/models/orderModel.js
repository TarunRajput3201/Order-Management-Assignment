const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      ref: "User",
    },
    product: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);