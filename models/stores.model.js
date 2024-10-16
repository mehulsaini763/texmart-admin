import mongoose, { Schema } from 'mongoose';
import Billboard from './billboards.model';
import Category from './categories.model';
import Color from './colors.model';
import Product from './products.model';
import Size from './sizes.model';

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

storeSchema.post('findOneAndDelete', async function (doc, next) {
  const storeId = doc._id;
  await Billboard.deleteMany({ storeId });
  await Category.deleteMany({ storeId });
  await Color.deleteMany({ storeId });
  await Product.deleteMany({ storeId });
  await Size.deleteMany({ storeId });
  next();
});

export default mongoose.models.Store || mongoose.model('Store', storeSchema);
