import mongoose, { Schema } from 'mongoose';
import Product from './products.model';

const sizeScema = new Schema(
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

sizeScema.post('findOneAndDelete', async function (doc, next) {
  const sizeId = doc._id;
  Product.deleteMany({ sizeId });
  next();
});

export default mongoose.models.Size || mongoose.model('Size', sizeScema);