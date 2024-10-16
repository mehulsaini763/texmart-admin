import mongoose, { Schema } from 'mongoose';
import Product from './products.model';

const colorScema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

colorScema.post('findOneAndDelete', async function (doc, next) {
  const colorId = doc._id;
  Product.deleteMany({ colorId });
  next();
});

export default mongoose.models.Color || mongoose.model('Color', colorScema);
