import mongoose, { Schema } from 'mongoose';
import Category from './categories.model';

const billboardSchema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

billboardSchema.post('findOneAndDelete', async function (doc, next) {
  const billboardId = doc._id;
  await Category.deleteMany({ billboardId });
  next();
});

export default mongoose.models.Billboard || mongoose.model('Billboard', billboardSchema);