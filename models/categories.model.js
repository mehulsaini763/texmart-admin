import mongoose, { Schema } from 'mongoose';
import Product from './products.model';

const categorySchema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    billboardId: {
      type: Schema.Types.ObjectId,
      ref: 'Billboard',
      required: true,
    },
    name: {
      type: String,
      requred: true,
    },
  },
  { timestamps: true },
);

categorySchema.post('findOneAndDelete', async function (doc, next) {
  const categoryId = doc._id;
  Product.deleteMany({ categoryId });
  next();
});

categorySchema.post('deleteMany', async function (doc, next) {
  const categoryId = doc._id;
  Product.deleteMany({ categoryId });
  next();
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
