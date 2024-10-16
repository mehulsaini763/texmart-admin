import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
      },
    ],
    isPaid: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);