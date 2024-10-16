import mongoose, { Schema } from 'mongoose';

const orderItemSchema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);
