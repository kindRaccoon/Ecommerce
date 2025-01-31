const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: Object, required: true, ref:'User' },
        products: [
          {
            productId: {
              type: Object, ref:'Product'
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
      },
      { timestamps: true }
);


module.exports = mongoose.model('Order', OrderSchema);